import DistributionChart from "./DistributionChart";
import FormulaErrorDisplay from "./FormulaErrorDisplay";
import { useDistributionWorker } from "./use-distribution-worker";
import { useState } from "react";

export default function App() {
	const [input, setInput] = useState<string>("1d12 + 1d20");
	const [result, calculate] = useDistributionWorker();
	const [lastSubmittedFormula, setLastSubmittedFormula] = useState<string>(input);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLastSubmittedFormula(input);
		calculate(input);
	}

	return (
		<div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-900 to-zinc-800 p-2 sm:p-4">
			<div className="m-2 flex w-full max-w-2xl flex-col items-center rounded-xl border border-slate-700 bg-zinc-900 p-4 shadow-xl sm:m-4 sm:rounded-2xl sm:p-8">
				<h1 className="mb-4 text-center text-2xl font-extrabold tracking-tight text-slate-200 drop-shadow sm:mb-6 sm:text-4xl">SomeDice</h1>
				<form onSubmit={handleSubmit} className="mb-6 flex w-full flex-col items-center justify-center gap-2 sm:mb-8 sm:flex-row">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="w-full max-w-full flex-1 rounded-t-lg border border-slate-700 bg-zinc-800 px-4 py-2 text-base text-slate-100 shadow-sm placeholder:text-slate-500 focus:ring-2 focus:ring-slate-400 focus:outline-none sm:w-screen sm:max-w-prose sm:rounded-l-lg sm:rounded-tr-none sm:text-lg"
					/>
					<button
						type="submit"
						className="w-full rounded-b-lg bg-slate-700 px-6 py-2 text-base font-semibold text-white shadow transition-colors hover:bg-slate-800 sm:w-auto sm:rounded-r-lg sm:rounded-bl-none sm:text-lg"
					>
						Calculate
					</button>
				</form>
				<div className="flex w-full flex-col items-center">
					{result.result === "error" && <FormulaErrorDisplay formula={lastSubmittedFormula} error={result.error} index={result.index} />}
					{result.result === "idle" && <div className="py-8 text-center text-slate-300">Enter a dice formula and press Calculate.</div>}
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
