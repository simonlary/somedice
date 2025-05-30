export default function DistributionChart({ distribution }: { distribution: Map<number, number> }) {
	const entries = Array.from(distribution.entries()).sort((a, b) => a[0] - b[0]);
	const maxProb = Math.max(...entries.map(([, p]) => p));
	const barGap = 8;
	const barHeight = 18;
	const labelWidth = 40;
	const percentWidth = 48;
	const barAreaWidth = 600;
	const chartWidth = labelWidth + barAreaWidth + percentWidth;
	const chartHeight = entries.length * (barHeight + barGap) + 30;
	return (
		<div style={{ width: "100%", display: "flex" }}>
			<svg
				viewBox={`0 0 ${chartWidth} ${chartHeight}`}
				className="block h-auto w-full rounded-lg border border-indigo-200 bg-indigo-50 shadow dark:border-gray-700 dark:bg-gray-800"
				style={{ aspectRatio: `${chartWidth} / ${chartHeight}` }}
			>
				{entries.map(([value, prob], i) => {
					const barLength = prob === 0 ? 0 : (prob / maxProb) * barAreaWidth;
					const y = i * (barHeight + barGap) + 30;
					return (
						<g key={value}>
							<text
								x={labelWidth - 8}
								y={y + barHeight / 2 + 5}
								textAnchor="end"
								fontSize="14"
								fill="currentColor"
								fontWeight="bold"
								className="text-indigo-800 dark:text-indigo-200"
							>
								{value}
							</text>
							<rect x={labelWidth} y={y} width={barLength} height={barHeight} fill="#6366f1" className="dark:fill-indigo-600" rx="4" />
							<text
								x={labelWidth + barLength + 8}
								y={y + barHeight / 2 + 5}
								textAnchor="start"
								fontSize="12"
								fill="currentColor"
								className="text-indigo-700 dark:text-indigo-300"
							>
								{(prob * 100).toFixed(2)}%
							</text>
						</g>
					);
				})}
			</svg>
		</div>
	);
}
