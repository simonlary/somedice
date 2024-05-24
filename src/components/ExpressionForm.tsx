import { useLocalStorageState } from "../hooks/use-local-storage-state";
import Button from "./Button";

export default function ExpressionForm({ onCalculate }: Props) {
	const [expressions, setExpressions] = useLocalStorageState<string[]>("expressions", [""]);

	return (
		<form
			className="flex size-full flex-col items-center justify-center gap-4"
			onSubmit={(event) => {
				event.preventDefault();
				onCalculate(expressions);
			}}
		>
			{expressions.map((expression, index) => (
				<div key={index} className="flex w-full items-center justify-center gap-4">
					<input
						type="text"
						placeholder={`Expression ${index + 1}`}
						className="w-full max-w-prose rounded border px-3 py-2 text-black"
						value={expression}
						onChange={(event) => {
							const updatedExpressions = [...expressions];
							updatedExpressions[index] = event.target.value;
							setExpressions(updatedExpressions);
						}}
					/>
					<Button
						variant="danger"
						type="button"
						disabled={expressions.length <= 1}
						onClick={() => {
							if (expressions.length > 1) {
								const updatedExpressions = [...expressions];
								updatedExpressions.splice(index, 1);
								setExpressions(updatedExpressions);
							}
						}}
					>
						Remove
					</Button>
				</div>
			))}
			<div className="flex gap-4">
				<Button
					variant="primary"
					type="button"
					onClick={() => {
						setExpressions([...expressions, ""]);
					}}
				>
					Add Expression
				</Button>
				<Button variant="primary">Calculate</Button>
			</div>
		</form>
	);
}

interface Props {
	onCalculate: (expressions: string[]) => void;
}
