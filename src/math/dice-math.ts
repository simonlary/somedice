import { calculateDistribution } from "./distribution";
import { parse } from "./parser";
import { tokenize } from "./tokenizer";

export function calculateDistributionFromFormula(formula: string): Map<number, number> {
	const tokens = tokenize(formula);
	const ast = parse(tokens);
	return calculateDistribution(ast);
}
