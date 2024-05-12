import { calculateExpressionProbabilityDistribution } from "./calculateProbabilityDistribution";
import { useMemo } from "react";

export function useProbabilityDistribution(
	expression: string,
): { isValid: true; data: [number, number][] } | { isValid: false; error: string } {
	return useMemo(() => {
		try {
			return { isValid: true, data: calculateExpressionProbabilityDistribution(expression) };
		} catch (error) {
			return { isValid: false, error: getErrorMessage(error) };
		}
	}, [expression]);
}

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}
