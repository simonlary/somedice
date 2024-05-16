import { useProbabilityDistribution } from "../hooks/use-probability-distribution";
import Button from "./Button";
import Visualizer from "./Visualizer";
import { useState } from "react";

export default function App() {
	const [expression, setExpression] = useState("1d6 + 3 - 1d4");

	const { distribution, error, status, calculate } = useProbabilityDistribution(expression);

	return (
		<>
			<main className="mx-auto flex size-full flex-col items-center justify-center gap-4 py-6">
				<form
					className="mx-auto flex size-full flex-col items-center justify-center gap-4"
					onSubmit={(e) => {
						e.preventDefault();
						calculate();
					}}
				>
					<input
						type="text"
						className="w-full max-w-prose appearance-none rounded border px-3 py-2 text-gray-700"
						value={expression}
						onChange={(e) => {
							setExpression(e.currentTarget.value);
						}}
					/>
					<Button variant="primary">Calculate</Button>
				</form>
				{status === "loading" && <div className="text-white">Loading...</div>}
				{status === "error" && <div className="text-white">Error: {error}</div>}
				{status === "success" && <Visualizer distribution={distribution} />}
			</main>
		</>
	);
}
