import GraphVisualizer from "./GraphVisualizer";
import Metrics from "./Metrics";
import { useMemo } from "react";

export default function Visualizer({ distributions }: Props) {
	const data = useMemo(() => {
		return distributions.map((distribution) => {
			return Array.from(distribution.entries())
				.map(([result, probability]) => ({ result, probability }))
				.sort((a, b) => a.result - b.result);
		});
	}, [distributions]);

	return (
		<div className="flex w-full flex-wrap items-stretch justify-center gap-2">
			{data.map((data, index) => (
				<section key={index} className="flex w-full max-w-3xl flex-col items-center justify-between">
					<h2 className="text-white font-bold text-xl">Output {index + 1}</h2>
					{/* <Metrics data={data} /> */}
					<GraphVisualizer data={data} />
				</section>
			))}
		</div>
	);
}

interface Props {
	distributions: Map<number, number>[];
}
