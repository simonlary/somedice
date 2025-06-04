import { FormulaError } from "./formula-error";
import type { Token } from "./token";

export function tokenize(formula: string): Token[] {
	const tokens: Token[] = [];
	let index = 0;

	function skipWhitespace() {
		while (index < formula.length && /[ \t\n]/.test(formula[index])) index++;
	}

	function matchNumber(): boolean {
		const match = /^\d+/.exec(formula.slice(index));
		if (match) {
			tokens.push({ type: "number", value: parseInt(match[0], 10), index });
			index += match[0].length;
			return true;
		}
		return false;
	}

	function matchKeep(): boolean {
		const keep = formula.slice(index, index + 2);
		if (keep === "kh" || keep === "kl") {
			tokens.push({ type: "keep", value: keep as "kh" | "kl", index });
			index += 2;
			return true;
		}
		return false;
	}

	function matchOperator(): boolean {
		const ops = ["+", "-", "*", "/"];
		if (ops.includes(formula[index])) {
			tokens.push({ type: "op", value: formula[index] as "+" | "-" | "*" | "/", index });
			index++;
			return true;
		}
		return false;
	}

	function matchParen(): boolean {
		if (formula[index] === "(" || formula[index] === ")") {
			tokens.push({ type: "paren", value: formula[index] as "(" | ")", index });
			index++;
			return true;
		}
		return false;
	}

	function matchD(): boolean {
		if (formula[index] === "d" || formula[index] === "D") {
			tokens.push({ type: "d", index });
			index++;
			return true;
		}
		return false;
	}

	while (index < formula.length) {
		skipWhitespace();
		if (index >= formula.length) break;
		if (matchNumber()) continue;
		if (matchD()) continue;
		if (matchKeep()) continue;
		if (matchOperator()) continue;
		if (matchParen()) continue;
		throw new FormulaError(index, `Unexpected character: '${formula[index]}'`);
	}
	tokens.push({ type: "eof", index });
	return tokens;
}
