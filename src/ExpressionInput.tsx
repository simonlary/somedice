export default function ExpressionInput({ expression, onExpressionChanged }: Props) {
	return (
		<input
			type="text"
			className="w-full max-w-prose appearance-none rounded border px-3 py-2 text-gray-700"
			value={expression}
			onChange={(e) => {
				onExpressionChanged(e.currentTarget.value);
			}}
		/>
	);
}

interface Props {
	expression: string;
	onExpressionChanged: (newExpression: string) => void;
}
