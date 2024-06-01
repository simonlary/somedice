import GraphVisualizer from "./GraphVisualizer";
import { useMemo } from "react";

export default function Visualizer({ distributions, expressions }: Props) {
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
					<h2 className="text-xl font-bold text-white">{expressions[index]}</h2>
					{/* <Metrics data={data} /> */}
					<GraphVisualizer data={data} />
				</section>
			))}
		</div>
	);
}

interface Props {
	distributions: Map<number, number>[];
	expressions: string[];
}
