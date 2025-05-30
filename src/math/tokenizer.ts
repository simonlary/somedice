import type { Token } from "./token";

export function tokenize(formula: string): Token[] {
	const tokens: Token[] = [];
	let i = 0;

	function skipWhitespace() {
		while (i < formula.length && /[ \t\n]/.test(formula[i])) i++;
	}

	function matchNumber(): boolean {
		const match = /^\d+/.exec(formula.slice(i));
		if (match) {
			tokens.push({ type: "number", value: parseInt(match[0], 10) });
			i += match[0].length;
			return true;
		}
		return false;
	}

	function matchKeep(): boolean {
		const keep = formula.slice(i, i + 2);
		if (keep === "kh" || keep === "kl") {
			tokens.push({ type: "keep", value: keep as "kh" | "kl" });
			i += 2;
			return true;
		}
		return false;
	}

	function matchOperator(): boolean {
		const ops = ["+", "-", "*", "/"];
		if (ops.includes(formula[i])) {
			tokens.push({ type: "op", value: formula[i] as "+" | "-" | "*" | "/" });
			i++;
			return true;
		}
		return false;
	}

	function matchParen(): boolean {
		if (formula[i] === "(" || formula[i] === ")") {
			tokens.push({ type: "paren", value: formula[i] as "(" | ")" });
			i++;
			return true;
		}
		return false;
	}

	function matchD(): boolean {
		if (formula[i] === "d" || formula[i] === "D") {
			tokens.push({ type: "d" });
			i++;
			return true;
		}
		return false;
	}

	while (i < formula.length) {
		skipWhitespace();
		if (i >= formula.length) break;
		if (matchNumber()) continue;
		if (matchD()) continue;
		if (matchKeep()) continue;
		if (matchOperator()) continue;
		if (matchParen()) continue;
		throw new Error(`Unexpected character: ${formula[i]}`);
	}
	tokens.push({ type: "eof" });
	return tokens;
}
