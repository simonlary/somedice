import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function GraphVisualizer({ data }: Props) {
	const formattedData = data.map(({ result, probability }) => ({ result, probability: probability * 100 }));
	return (
		<div className="w-full max-w-4xl overflow-hidden text-white">
			<ResponsiveContainer width="100%" height={30 * formattedData.length + 24}>
				<BarChart data={formattedData} layout="vertical">
					<CartesianGrid horizontal={false} strokeDasharray={4} />
					<XAxis dataKey="probability" tick={{ fill: "white" }} unit="%" type="number" />
					<YAxis dataKey="result" tick={{ fill: "white" }} type="category" interval={0} />
					<Tooltip
						itemStyle={{ color: "white" }}
						contentStyle={{ backgroundColor: "#334155", padding: "0 0.5rem", border: "none", borderRadius: "0.5rem" }}
						labelFormatter={() => ""}
						formatter={(value: number) => value.toFixed(2)}
						animationDuration={300}
					/>
					<Bar dataKey="probability" fill="#8884d8" unit="%" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

interface Props {
	data: {
		result: number;
		probability: number;
	}[];
}
