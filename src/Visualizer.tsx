import { evaluate } from "mathjs";

export default function Visualizer({ expression }: Props) {
	const diceRegex = /(\d+)d(\d+)/g;
	let variableIndex = 1;
	const variableMapping: Record<`x${number}`, `${number}d${number}`> = {};
	const minMapping: Record<`x${number}`, number> = {};
	const maxMapping: Record<`x${number}`, number> = {};
	const replacedExpr = expression.replace(diceRegex, (_, numDice, numSides) => {
		const variableName = `x${variableIndex++}` as const;
		variableMapping[variableName] = `${numDice}d${numSides}`;
		minMapping[variableName] = parseInt(numDice) * 1;
		maxMapping[variableName] = parseInt(numDice) * parseInt(numSides);
		return variableName;
	});
	const min = evaluate(replacedExpr, minMapping);
	const max = evaluate(replacedExpr, maxMapping);

	return (
		<div className="text-white">
			<p>Expression: {expression}</p>
			<p>Replaced Expression: {replacedExpr}</p>
			<p>Min: {min}</p>
			<p>Max: {max}</p>
		</div>
	);
}

interface Props {
	expression: string;
}
