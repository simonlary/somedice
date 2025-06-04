export default function FormulaErrorDisplay({ formula, error, index }: { formula: string; error: string; index?: number }) {
	return (
		<div className="mb-4 flex w-full max-w-prose flex-col items-center text-lg font-medium text-red-400">
			<div className="relative w-full">
				<pre className="m-0 rounded-t border border-b-0 border-slate-700 bg-slate-900 p-2 font-mono text-base break-all whitespace-pre-wrap text-slate-200">
					{formula}
					{typeof index === "number" && index <= formula.length && "\n" + " ".repeat(index) + "^"}
				</pre>
			</div>
			<div className="w-full rounded-b border border-t-0 border-slate-700 bg-slate-950 px-4 py-2 text-base text-red-300 shadow-inner">
				{error}
			</div>
		</div>
	);
}
