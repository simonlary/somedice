import GraphVisualizer from "./GraphVisualizer";
import Metrics from "./Metrics";
import { memo } from "react";

export default memo(function Visualizer({ distribution }: Props) {
	const data = Array.from(distribution.entries())
		.map(([result, probability]) => ({ result, probability }))
		.sort((a, b) => a.result - b.result);

	return (
		<>
			<Metrics data={data} />
			<GraphVisualizer data={data} />
		</>
	);
});

interface Props {
	distribution: Map<number, number>;
}
