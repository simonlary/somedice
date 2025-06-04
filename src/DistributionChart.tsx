export default function DistributionChart({ distribution }: { distribution: Map<number, number> }) {
	const entries = Array.from(distribution.entries()).sort((a, b) => a[0] - b[0]);
	const maxProb = Math.max(...entries.map(([, p]) => p));
	const barGap = 8;
	const barHeight = 18;
	const labelWidth = 40;
	const percentWidth = 48;
	const barAreaWidth = 600;
	const chartWidth = labelWidth + barAreaWidth + percentWidth;
	const chartHeight = entries.length * (barHeight + barGap) + barGap;
	return (
		<svg
			viewBox={`0 0 ${chartWidth} ${chartHeight}`}
			className="h-auto w-full rounded-lg border border-slate-700 bg-zinc-800 shadow"
			style={{ aspectRatio: `${chartWidth} / ${chartHeight}` }}
		>
			{entries.map(([value, prob], i) => {
				const barLength = prob === 0 ? 0 : (prob / maxProb) * barAreaWidth;
				const y = i * (barHeight + barGap) + barGap;
				return (
					<g key={value}>
						<text x={labelWidth - 8} y={y + barHeight / 2 + 5} textAnchor="end" fontSize="14" fill="#cbd5e1" fontWeight="bold">
							{value}
						</text>
						<rect x={labelWidth} y={y} width={barLength} height={barHeight} fill="#64748b" rx="4" />
						<text x={labelWidth + barLength + 8} y={y + barHeight / 2 + 5} textAnchor="start" fontSize="12" fill="#e0e7ef">
							{(prob * 100).toFixed(2)}%
						</text>
					</g>
				);
			})}
		</svg>
	);
}
