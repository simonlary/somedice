import Button from "./Button";
import { FormEvent } from "react";

export default function ExpressionForm({ onCalculate }: Props) {
	return (
		<form
			className="mx-auto flex size-full flex-col items-center justify-center gap-4"
			onSubmit={(e: FormEvent<FormElement>) => {
				e.preventDefault();
				onCalculate(e.currentTarget.expression.value);
			}}
		>
			<input type="text" name="expression" className="w-full max-w-prose appearance-none rounded border px-3 py-2 text-gray-700" />
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
