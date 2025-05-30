import { useCallback, useEffect, useRef, useState } from "react";

interface SuccessResult {
	result: "success";
	distribution: Map<number, number>;
}

interface ErrorResult {
	result: "error";
	error: string;
}

interface LoadingResult {
	result: "loading";
}

interface IdleResult {
	result: "idle";
}

type Result = SuccessResult | ErrorResult | LoadingResult | IdleResult;

export function useDistributionWorker(): [Result, (formula: string) => void] {
	const [result, setResult] = useState<Result>({ result: "idle" });
	const workerRef = useRef<Worker>(null);

	useEffect(() => {
		const worker = new Worker(new URL("./distribution.worker.ts", import.meta.url), {
			type: "module",
		});
		worker.onmessage = (e) => {
			if (e.data.type === "success") {
				setResult({
					result: "success",
					distribution: new Map<number, number>(e.data.distribution),
				});
			} else {
				setResult({ result: "error", error: e.data.error });
			}
		};
		workerRef.current = worker;
		return () => {
			worker.terminate();
			workerRef.current = null;
		};
	}, []);

	const calculate = useCallback((formula: string) => {
		setResult({ result: "loading" });
		workerRef.current?.postMessage(formula);
	}, []);

	return [result, calculate];
}
