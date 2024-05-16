import { calculateExpressionProbabilityDistribution } from "../utils/calculate-probability-distribution";
import { useCallback, useState } from "react";

export function useProbabilityDistribution(expression: string): Result & { calculate: () => void } {
	const [result, setResult] = useState<Result>({ status: "idle" });

	const calculate = useCallback(() => {
		setResult({ status: "loading" });
		try {
			// TODO: `calculateExpressionProbabilityDistribution()` will be async in the future
			const distribution = calculateExpressionProbabilityDistribution(expression);
			setResult({ status: "success", distribution });
		} catch (error) {
			setResult({ status: "error", error: getErrorMessage(error) });
		}
	}, [expression]);

	return { ...result, calculate };
}

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

interface IdleResult {
	status: "idle";
	distribution?: undefined;
	error?: undefined;
}

interface LoadingResult {
	status: "loading";
	distribution?: undefined;
	error?: undefined;
}

interface SuccessResult {
	status: "success";
	distribution: Map<number, number>;
	error?: undefined;
}

interface ErrorResult {
	status: "error";
	distribution?: undefined;
	error: string;
}

type Result = IdleResult | LoadingResult | SuccessResult | ErrorResult;
