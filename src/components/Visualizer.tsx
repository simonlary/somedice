import GraphVisualizer from "./GraphVisualizer";
import TableVisualizer from "./TableVisualizer";

export default function Visualizer({ distribution }: Props) {
	const result2 = Array.from(distribution.entries()).sort(([a], [b]) => a - b);

	return (
		<>
			<GraphVisualizer data={result2} />
			<TableVisualizer data={result2} />
		</>
	);
}

interface Props {
	distribution: Map<number, number>;
}
