import GraphVisualizer from "./GraphVisualizer";
import TableVisualizer from "./TableVisualizer";

export default function Visualizer({ distribution }: Props) {
	const data = Array.from(distribution.entries())
		.map(([result, probability]) => ({ result, probability }))
		.sort((a, b) => a.result - b.result);

	return (
		<>
			<GraphVisualizer data={data} />
			<TableVisualizer data={data} />
		</>
	);
}

interface Props {
	distribution: Map<number, number>;
}
