import Button from "./Button";
import { FormEvent } from "react";

export default function ExpressionForm({ onCalculate }: Props) {
	return (
		<form
			className="flex size-full flex-col items-center justify-center gap-4"
			onSubmit={(e: FormEvent<FormElement>) => {
				e.preventDefault();
				onCalculate(e.currentTarget.expression.value);
			}}
		>
			<div className="flex w-full items-center justify-center gap-4">
				<label htmlFor="expression" className="text-lg font-bold text-white">
					Expression:
				</label>
				<input
					type="text"
					name="expression"
					placeholder="2d6 + 1d4 - 3"
					className="w-full max-w-prose appearance-none rounded border px-3 py-2 text-gray-700"
				/>
			</div>
			<Button variant="primary">Calculate</Button>
		</form>
	);
}

interface Props {
	onCalculate: (expression: string) => void;
}

interface FormElement extends HTMLFormElement {
	expression: HTMLInputElement;
}
