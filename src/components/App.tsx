import Button from "./Button";
import ExpressionInput from "./ExpressionInput";
import Visualizer from "./Visualizer";
import { useState } from "react";

export default function App() {
	const [expression, setExpression] = useState("1d6 + 3 - 1d4");

	return (
		<>
			<main className="mx-auto flex size-full flex-col items-center justify-center gap-4 py-6">
				<ExpressionInput expression={expression} onExpressionChanged={(newExpression) => setExpression(newExpression)} />
				<Button variant="primary" onClick={() => console.log("click")}>
					Calculate
				</Button>
				<Visualizer expression={expression} />
			</main>
		</>
	);
}
