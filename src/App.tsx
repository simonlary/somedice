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
		<div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-900 to-zinc-800 p-4">
			<div className="m-4 flex max-w-full flex-col items-center rounded-2xl border border-slate-700 bg-zinc-900 p-8 shadow-xl">
				<h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-200 drop-shadow">SomeDice</h1>
				<form onSubmit={handleSubmit} className="mb-8 flex w-full items-center justify-center gap-2">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="w-screen max-w-prose flex-1 rounded-l-lg border border-slate-700 bg-zinc-800 px-4 py-2 text-lg text-slate-100 shadow-sm placeholder:text-slate-500 focus:ring-2 focus:ring-slate-400 focus:outline-none"
					/>
					<button
						type="submit"
						className="rounded-r-lg bg-slate-700 px-6 py-2 text-lg font-semibold text-white shadow transition-colors hover:bg-slate-800"
					>
						Calculate
					</button>
				</form>
				<div className="flex w-full flex-col items-center">
					{result.result === "error" && <div className="mb-4 text-lg font-medium text-red-400">{result.error}</div>}
					{result.result === "idle" && <div className="py-8 text-slate-300">Enter a dice formula and press Calculate.</div>}
					{result.result === "loading" && (
						<div className="flex flex-col items-center gap-2 py-8">
							<svg className="h-8 w-8 animate-spin text-slate-400" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
							</svg>
							<span className="font-medium text-slate-300">Calculating...</span>
						</div>
					)}
					{result.result === "success" && <DistributionChart distribution={result.distribution} />}
				</div>
			</div>
		</div>
	);
}
