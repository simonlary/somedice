import { useProbabilityDistribution } from "../hooks/use-probability-distribution";
import ExpressionForm from "./ExpressionForm";
import Visualizer from "./Visualizer";

export default function App() {
	const { distributions, error, status, calculate } = useProbabilityDistribution();

	return (
		<>
			<main className="mx-auto flex size-full flex-col items-center justify-center gap-4 px-4 py-6">
				<ExpressionForm onCalculate={(expressions) => void calculate(expressions)} />
				<hr className="w-full border-t border-gray-700" />
				{status === "loading" && <div className="text-white">Calculating...</div>}
				{status === "error" && <div className="text-white">Error: {error}</div>}
				{status === "success" && <Visualizer distributions={distributions} />}
			</main>
		</>
	);
}
