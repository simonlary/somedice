import { useProbabilityDistribution } from "../hooks/use-probability-distribution";
import Button from "./Button";
import ExpressionInput from "./ExpressionInput";
import Visualizer from "./Visualizer";
import { useState } from "react";

export default function App() {
	const [expression, setExpression] = useState("1d6 + 3 - 1d4");

	const { distribution, error, status, calculate } = useProbabilityDistribution(expression);

	return (
		<>
			<main className="mx-auto flex size-full flex-col items-center justify-center gap-4 py-6">
				<ExpressionInput expression={expression} onExpressionChanged={(newExpression) => setExpression(newExpression)} />
				<Button variant="primary" onClick={() => calculate()}>
					Calculate
				</Button>
				{status === "loading" && <div className="text-white">Loading...</div>}
				{status === "error" && <div className="text-white">Error: {error}</div>}
				{status === "success" && <Visualizer distribution={distribution} />}
			</main>
		</>
	);
}
