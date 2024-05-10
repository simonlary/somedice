import { compile } from "mathjs";
import { useMemo } from "react";

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

function cartesian(arrays: number[][]) {
	return arrays.reduce<number[][]>((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [[]]);
}

function calculateProbabilityDistribution(expression: string) {
	const { variables, replacedExpression } = extractVariables(expression);
	const compiledExpression = compile(replacedExpression);

	const totalProbabilities = new Map<number, number>();

	for (const outcomes of cartesian(variables.map((variable) => Array.from(variable.probabilities.keys())))) {
		const result = compiledExpression.evaluate(
			Object.fromEntries(variables.map((variable, index) => [variable.variableName, outcomes[index]])),
		) as number;
		totalProbabilities.set(
			result,
			(totalProbabilities.get(result) ?? 0) + outcomes.reduce((acc, value, index) => acc * variables[index].probabilities.get(value)!, 1),
		);
	}

	return Array.from(totalProbabilities.entries()).sort(([a], [b]) => a - b);
}

interface Variable {
	variableName: `x${number}`;
	probabilities: Map<number, number>;
}

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

export function useProbabilityDistribution(
	expression: string,
): { isValid: true; data: [number, number][] } | { isValid: false; error: string } {
	return useMemo(() => {
		try {
			return { isValid: true, data: calculateProbabilityDistribution(expression) };
		} catch (error) {
			return { isValid: false, error: getErrorMessage(error) };
		}
	}, [expression]);
}
