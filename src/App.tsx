import DistributionChart from "./DistributionChart";
import { useDistributionWorker } from "./use-distribution-worker";
import { useState } from "react";

export default function App() {
	const [input, setInput] = useState<string>("1d12 + 1d20");
	const [result, calculate] = useDistributionWorker();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		calculate(input);
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4 dark:from-gray-900 dark:to-gray-800">
			<div className="m-4 flex max-w-full flex-col items-center rounded-2xl border border-indigo-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-900">
				<h1 className="mb-6 text-4xl font-extrabold tracking-tight text-indigo-700 drop-shadow dark:text-indigo-200">Dice Roller</h1>
				<form onSubmit={handleSubmit} className="mb-8 flex w-full items-center justify-center gap-2">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="w-screen max-w-prose flex-1 rounded-l-lg border border-indigo-300 bg-indigo-50 px-4 py-2 text-lg text-gray-900 shadow-sm placeholder:text-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-indigo-100 dark:placeholder:text-indigo-500 dark:focus:ring-indigo-700"
					/>
					<button
						type="submit"
						className="rounded-r-lg bg-indigo-600 px-6 py-2 text-lg font-semibold text-white shadow transition-colors hover:bg-indigo-700 dark:bg-indigo-800 dark:hover:bg-indigo-900"
					>
						Calculate
					</button>
				</form>
				<div className="flex w-full flex-col items-center">
					{result.result === "error" && <div className="mb-4 text-lg font-medium text-red-600 dark:text-red-400">{result.error}</div>}
					{result.result === "idle" && (
						<div className="py-8 text-indigo-700 dark:text-indigo-200">Enter a dice formula and press Calculate.</div>
					)}
					{result.result === "loading" && (
						<div className="flex flex-col items-center gap-2 py-8">
							<svg className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-300" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
							</svg>
							<span className="font-medium text-indigo-700 dark:text-indigo-200">Calculating...</span>
						</div>
					)}
					{result.result === "success" && <DistributionChart distribution={result.distribution} />}
				</div>
			</div>
		</div>
	);
}
