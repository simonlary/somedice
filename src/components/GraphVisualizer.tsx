import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function GraphVisualizer({ data }: Props) {
	const goodData = data.map(([sum, probability]) => ({ sum, probability: probability * 100 }));
	return (
		<div className="w-full max-w-prose text-white">
			<ResponsiveContainer width="100%" aspect={16 / 9}>
				<BarChart data={goodData}>
					<CartesianGrid />
					<XAxis dataKey="sum" tick={{ fill: "white" }} />
					<YAxis dataKey="probability" tick={{ fill: "white" }} unit="%" />
					<Tooltip />
					<Bar dataKey="probability" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

interface Props {
	data: [number, number][];
}
