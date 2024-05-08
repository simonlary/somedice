import ExpressionInput from "./ExpressionInput";
import { useState } from "react";

function App() {
	const [expressions, setExpressions] = useState<string[]>([]);

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
						<button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700" onClick={() => removeExpression(index)}>
							X
						</button>
					</div>
				))}
				<button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" onClick={() => createExpression()}>
					Add Output
				</button>
			</main>
		</>
	);
}

export default App;
