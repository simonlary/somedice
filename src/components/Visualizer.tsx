import { useProbabilityDistribution } from "../hooks/use-probability-distribution";
import GraphVisualizer from "./GraphVisualizer";
import TableVisualizer from "./TableVisualizer";

export default function Visualizer({ expression }: Props) {
	const result = useProbabilityDistribution(expression);

	if (!result.isValid) {
		return <div className="text-white">Error: {result.error}</div>;
	}

	return (
		<>
			<GraphVisualizer data={result.data} />
			<TableVisualizer data={result.data} />
		</>
	);
}

interface Props {
	expression: string;
}
