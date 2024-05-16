import type { Calculator } from "./calculator.worker";
import { wrap } from "comlink";
import { useCallback, useState } from "react";

const calculator = wrap<Calculator>(new Worker(new URL("./calculator.worker.ts", import.meta.url), { type: "module" }));

export function useProbabilityDistribution(expression: string): Result & { calculate: () => void } {
	const [result, setResult] = useState<Result>({ status: "idle" });

	const calculate = useCallback(() => {
		void (async () => {
			setResult({ status: "loading" });
			try {
				const distribution = await calculator.calculateExpressionProbabilityDistribution(expression);
				setResult({ status: "success", distribution });
			} catch (error) {
				setResult({ status: "error", error: getErrorMessage(error) });
			}
		})();
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
