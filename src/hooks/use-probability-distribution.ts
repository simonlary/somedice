import type { Calculator } from "./calculator.worker";
import { wrap } from "comlink";
import { useCallback, useState } from "react";

const calculator = wrap<Calculator>(new Worker(new URL("./calculator.worker.ts", import.meta.url), { type: "module" }));

export function useProbabilityDistribution(): Result & { calculate: (expressions: string[]) => Promise<void> } {
	const [result, setResult] = useState<Result>({ status: "idle" });

	const calculate = useCallback(async (expressions: string[]) => {
		setResult({ status: "loading" });
		try {
			const distributions = await Promise.all(
				expressions.map((expression) => calculator.calculateExpressionProbabilityDistribution(expression)),
			);
			setResult({ status: "success", distributions, expressions });
		} catch (error) {
			setResult({ status: "error", error: getErrorMessage(error) });
		}
	}, []);

	return { ...result, calculate };
}

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

interface IdleResult {
	status: "idle";
	distributions?: undefined;
	expressions?: undefined;
	error?: undefined;
}

interface LoadingResult {
	status: "loading";
	distributions?: undefined;
	expressions?: undefined;
	error?: undefined;
}

interface SuccessResult {
	status: "success";
	distributions: Map<number, number>[];
	expressions: string[];
	error?: undefined;
}

interface ErrorResult {
	status: "error";
	distributions?: undefined;
	expressions?: undefined;
	error: string;
}

type Result = IdleResult | LoadingResult | SuccessResult | ErrorResult;
