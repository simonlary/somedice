import Button from "./Button";
import ExpressionInput from "./ExpressionInput";
import Visualizer from "./Visualizer";
import { useState } from "react";

export default function App() {
	const [expressions, setExpressions] = useState<string[]>(["1d6 + 3 - 1d4"]);

	function onExpressionChanged(newExpression: string, index: number) {
		const newExpressions = [...expressions];
		newExpressions[index] = newExpression;
		setExpressions(newExpressions);
	}

	function removeExpression(index: number) {
		const newExpressions = [...expressions];
		newExpressions.splice(index, 1);
		setExpressions(newExpressions);
	}

	function createExpression() {
		setExpressions([...expressions, ""]);
	}

	return (
		<>
			<main className="mx-auto flex size-full flex-col items-center justify-center gap-4 py-6">
				{expressions.map((expression, index) => (
					<div key={index} className="flex size-full items-center justify-center gap-4">
						<ExpressionInput expression={expression} onExpressionChanged={(newExpression) => onExpressionChanged(newExpression, index)} />
						<Button variant="danger" onClick={() => removeExpression(index)}>
							X
						</Button>
					</div>
				))}
				<div className="flex gap-3">
					<Button variant="primary" onClick={() => createExpression()}>
						Add Output
					</Button>
					<Button variant="primary" onClick={() => createExpression()}>
						Calculate
					</Button>
				</div>
				<Visualizer expression={expressions[0]} />
			</main>
		</>
	);
}
