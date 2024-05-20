import { useMemo } from "react";

export default function Metrics({ data }: Props) {
	const { mean, standardDeviation, median } = useMemo(() => {
		const mean = data.reduce((acc, { result, probability }) => acc + result * probability, 0);

		const standardDeviation = Math.sqrt(data.reduce((acc, { result, probability }) => acc + (result - mean) ** 2 * probability, 0));

		const middleIndex = Math.floor(data.length / 2);
		const median = data.length % 2 === 0 ? (data[middleIndex - 1].result + data[middleIndex].result) / 2 : data[middleIndex].result;

		return {
			mean,
			standardDeviation,
			median,
		};
	}, [data]);

	return (
		<div className="flex flex-col items-center text-white">
			<p>Mean: {mean.toFixed(2)}</p>
			<p>Standard Deviation: {standardDeviation.toFixed(2)}</p>
			<p>Median: {median.toFixed(2)}</p>
		</div>
	);
}

interface Props {
	data: {
		result: number;
		probability: number;
	}[];
}
