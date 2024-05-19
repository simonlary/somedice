import { compile } from "mathjs/number";

export function calculateProbabilityDistribution(expression: string) {
	// Replace dice roll expressions with variable names x1, x2, etc
	const { variables, replacedExpression } = extractVariables(expression);

	// Calculate the probability distributions for each variable
	const variableProbabilities = variables.map(
		(variable) => calculateDiceRollProbabilityDistribution(variable.numberOfDice, variable.numberOfSides),
		// calculateDiceRollProbabilityDistribution2(variable.numberOfDice, variable.numberOfSides),
	);

	// Compile the expression for faster subsequent evaluations
	const compiledExpression = compile(replacedExpression);

	// Evaluate the expression with every possible outcome of the dice rolls and calculate the probability of each result
	const totalProbabilities = new Map<number, number>();
	const possibleOutcomesPerDie = variableProbabilities.map((probabilities) => Array.from(probabilities.keys()));
	const totalNumberOfOutcomes = possibleOutcomesPerDie.reduce((acc, outcomes) => acc * outcomes.length, 1);
	if (totalNumberOfOutcomes > 1_000_000) {
		throw new Error("The number of possible outcomes is too large.");
	}
	for (const diceOutcomes of cartesianProduct(possibleOutcomesPerDie)) {
		const scope = Object.fromEntries(variables.map((variable, index) => [variable.name, diceOutcomes[index]]));
		const result = compiledExpression.evaluate(scope) as unknown;
		if (typeof result !== "number") {
			throw new Error("Invalid expression.");
		}
		totalProbabilities.set(
			result,
			(totalProbabilities.get(result) ?? 0) + diceOutcomes.reduce((acc, value, index) => acc * variableProbabilities[index].get(value)!, 1),
		);
	}

	return totalProbabilities;
}

function extractVariables(expression: string) {
	const diceRegex = /(\d+)d(\d+)/g;
	let variableIndex = 1;
	const variables: { name: `x${number}`; numberOfDice: number; numberOfSides: number }[] = [];
	const replacedExpression = expression.replace(diceRegex, (_, numDice: string, numSides: string) => {
		const name = `x${variableIndex++}` as const;
		variables.push({
			name,
			numberOfDice: parseInt(numDice),
			numberOfSides: parseInt(numSides),
		});
		return name;
	});
	return { variables, replacedExpression };
}

function calculateDiceRollProbabilityDistribution(numDice: number, numSides: number) {
	if (numDice * numSides > 10_000) {
		throw new Error(`The number of possible outcomes of ${numDice}d${numSides} is too large.`);
	}

	// Create a 2D array to store probability distributions for each number of dice.
	const dp = new Array(numDice + 1).fill(null).map(() => new Array<number>(numSides * numDice + 1).fill(0));

	// Base case: For 0 dice, only sum 0 is possible with probability 1.
	dp[0][0] = 1;

	// Iterate through number of dice (1 to numDice).
	for (let dice = 1; dice <= numDice; dice++) {
		// Iterate through possible sums (1 to numSides * dice).
		for (let sum = 1; sum <= numSides * dice; sum++) {
			// Build probabilities based on previous rolls (dice - 1).
			for (let side = 1; side <= numSides; side++) {
				const prevSum = sum - side;
				if (prevSum >= 0 && prevSum <= numSides * (dice - 1)) {
					dp[dice][sum] += dp[dice - 1][prevSum];
				}
			}
		}
	}

	// Normalize probabilities for the desired number of dice.
	const totalOutcomes = Math.pow(numSides, numDice);
	const probabilities = new Map<number, number>();
	for (let sum = numDice; sum <= numSides * numDice; sum++) {
		probabilities.set(sum, dp[numDice][sum] / totalOutcomes);
	}

	return probabilities;
}

function cartesianProduct(arrays: number[][]) {
	return arrays.reduce<number[][]>((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [[]]);
}
