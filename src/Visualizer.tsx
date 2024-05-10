import { compile } from "mathjs";

export default function Visualizer({ expression }: Props) {
	return (
		<div className="text-white">
			<p>Expression: {expression}</p>
			<p>Replaced Expression: TODO</p>
			<p>Rolled all ones: TODO</p>
			<p>Rolled all highest value: TODO</p>
		</div>
	);
}

function diceRollProbabilities(numDice: number, numSides: number) {
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

function extractVariables(expression: string) {
	const diceRegex = /(\d+)d(\d+)/g;
	let variableIndex = 1;
	const variables: Variable[] = [];
	const replacedExpression = expression.replace(diceRegex, (_, numDice: string, numSides: string) => {
		const variableName = `x${variableIndex++}` as const;
		variables.push({
			variableName,
			probabilities: diceRollProbabilities(parseInt(numDice), parseInt(numSides)),
		});
		return variableName;
	});
	return { variables, replacedExpression };
}

const expression = "1d6 ^ 1d4";
const { variables, replacedExpression } = extractVariables(expression);
const compiledExpression = compile(replacedExpression);

const totalProbabilities = new Map<number, number>();
const probabilities0 = Array.from(variables[0].probabilities.entries());
const probabilities1 = Array.from(variables[1].probabilities.entries());
for (const [value0, probability0] of probabilities0) {
	for (const [value1, probability1] of probabilities1) {
		const result = compiledExpression.evaluate({ x1: value0, x2: value1 }) as number;
		totalProbabilities.set(result, (totalProbabilities.get(result) ?? 0) + probability0 * probability1);
	}
}

console.log(totalProbabilities);

interface Variable {
	variableName: `x${number}`;
	probabilities: Map<number, number>;
}

interface Props {
	expression: string;
}
