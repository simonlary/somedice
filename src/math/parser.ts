import { ASTNode, KeepData } from "./ast";
import { FormulaError } from "./formula-error";
import type { Token } from "./token";

export function parse(tokens: Token[]): ASTNode {
	let pos = 0;

	function peek(): Token {
		return tokens[pos];
	}
	function consume(): Token {
		return tokens[pos++];
	}

	function parsePrimary(): ASTNode {
		const token = peek();
		if (token.type === "number") {
			const num = consume() as { type: "number"; value: number };
			if (peek().type === "d") {
				consume();
				const sides = parseDiceSides();
				const keep = parseKeep();
				return { type: "dice", count: num.value, sides, keep };
			} else {
				return { type: "number", value: num.value };
			}
		} else if (token.type === "paren" && token.value === "(") {
			consume();
			const expr = parseExpression();
			const next = peek();
			if (next.type === "paren" && next.value === ")") {
				consume();
				return expr;
			} else {
				throw new FormulaError(next.index, "Expected closing parenthesis");
			}
		} else if (token.type === "op" && token.value === "-") {
			consume();
			const right = parsePrimary();
			return { type: "binary", op: "-", left: { type: "number", value: 0 }, right };
		}
		throw new FormulaError(token.index, "Unexpected token in primary");
	}

	function parseDiceSides(): number {
		if (peek().type === "number") {
			return (consume() as { type: "number"; value: number }).value;
		}
		const token = peek();
		throw new FormulaError(token.index, "Expected number after 'd'");
	}

	function parseKeep(): KeepData | undefined {
		if (peek().type === "keep") {
			const keepToken = consume() as { type: "keep"; value: "kh" | "kl"; index: number };
			if (peek().type === "number") {
				const keepCount = (consume() as { type: "number"; value: number }).value;
				return { type: keepToken.value, count: keepCount };
			}
			throw new FormulaError(keepToken.index + 2, `Expected number after ${keepToken.value}`);
		}
		return undefined;
	}

	function parseFactor(): ASTNode {
		let node = parsePrimary();
		while (peek().type === "op" && ["*", "/"].includes((peek() as { type: "op"; value: string }).value)) {
			const op = (consume() as { type: "op"; value: string }).value as "*" | "/";
			const right = parsePrimary();
			node = { type: "binary", op, left: node, right };
		}
		return node;
	}

	function parseTerm(): ASTNode {
		let node = parseFactor();
		while (peek().type === "op" && ["+", "-"].includes((peek() as { type: "op"; value: string }).value)) {
			const op = (consume() as { type: "op"; value: string }).value as "+" | "-";
			const right = parseFactor();
			node = { type: "binary", op, left: node, right };
		}
		return node;
	}

	function parseExpression(): ASTNode {
		return parseTerm();
	}

	const ast = parseExpression();
	if (peek().type !== "eof") {
		const token = peek();
		throw new FormulaError(token.index, "Unexpected input after end of expression");
	}
	return ast;
}
