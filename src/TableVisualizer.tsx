export default function TableVisualizer({ data }: Props) {
	return (
		<table className="w-40 border-collapse border border-slate-500 bg-slate-800 text-white shadow-sm">
			<thead className="bg-slate-700">
				<tr>
					<th className="w-1/2 border border-slate-600 p-4 text-left font-semibold text-slate-200">Sum</th>
					<th className="w-1/2 border border-slate-600 p-4 text-left font-semibold text-slate-200">Probability</th>
				</tr>
			</thead>
			<tbody className="bg-slate-800">
				{data.map(([sum, probability]) => (
					<tr key={sum}>
						<td className="border border-slate-700 p-4 text-slate-400">{sum.toFixed(2)}</td>
						<td className="border border-slate-700 p-4 text-slate-400">{(probability * 100).toFixed(2)}%</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

interface Props {
	data: [number, number][];
}
