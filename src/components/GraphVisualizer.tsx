import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const resultFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
const probabilityFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

export default function GraphVisualizer({ data }: Props) {
	const formattedData = data.map(({ result, probability }) => ({ result: resultFormatter.format(result), probability: probability * 100 }));
	const numberOfDigits = Math.max(...formattedData.map(({ result }) => result.toString().length));
	return (
		<div className="w-full max-w-4xl overflow-hidden text-white">
			<ResponsiveContainer width="100%" height={22 * formattedData.length + 70}>
				<BarChart data={formattedData} layout="vertical">
					<CartesianGrid horizontal={false} strokeDasharray={4} />
					<XAxis dataKey="probability" tick={{ fill: "white" }} unit="%" type="number" />
					<XAxis dataKey="probability" tick={{ fill: "white" }} unit="%" type="number" orientation="top" xAxisId="top" />
					<YAxis dataKey="result" tick={{ fill: "white" }} type="category" interval={0} width={8 * numberOfDigits + 3} />
					<Tooltip
						itemStyle={{ color: "white" }}
						contentStyle={{ backgroundColor: "#334155", padding: "0 0.5rem", border: "none", borderRadius: "0.5rem" }}
						labelFormatter={() => ""}
						formatter={(value: number) => probabilityFormatter.format(value)}
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
