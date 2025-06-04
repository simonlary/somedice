export default function DistributionChart({ distribution }: { distribution: Map<number, number> }) {
	const entries = Array.from(distribution.entries()).sort((a, b) => a[0] - b[0]);
	const maxProb = Math.max(...entries.map(([, p]) => p));

	return (
		<div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-1 rounded-lg border border-slate-700 bg-zinc-800 p-4 shadow">
			{entries.map(([value, prob]) => [
				<span key={`value-${value}`} className="text-right font-bold text-slate-300">
					{value}
				</span>,
				<span key={`bar-${value}`} className="h-5 rounded bg-slate-500" style={{ width: `${(prob / maxProb) * 100}%` }} />,
				<span key={`percent-${value}`} className="text-sm text-slate-100">
					{(prob * 100).toFixed(2)}%
				</span>,
			])}
		</div>
	);
}
