import { parseDiceFormula } from "./parser";
import type { Token } from "./token";
import { describe, expect, it } from "vitest";

function tokens(arr: Token[]): Token[] {
	return [...arr, { type: "eof" }];
}

describe("parser", () => {
	it("parses a simple dice formula", () => {
		const ast = parseDiceFormula(tokens([{ type: "number", value: 2 }, { type: "d" }, { type: "number", value: 6 }]));
		expect(ast).toMatchObject({ type: "dice", count: 2, sides: 6 });
	});

	it("parses keep highest", () => {
		const ast = parseDiceFormula(
			tokens([
				{ type: "number", value: 4 },
				{ type: "d" },
				{ type: "number", value: 6 },
				{ type: "keep", value: "kh" },
				{ type: "number", value: 3 },
			]),
		);
		expect(ast).toMatchObject({ type: "dice", count: 4, sides: 6, keep: { type: "kh", count: 3 } });
	});

	it("parses arithmetic expressions", () => {
		const ast = parseDiceFormula(
			tokens([
				{ type: "number", value: 1 },
				{ type: "d" },
				{ type: "number", value: 4 },
				{ type: "op", value: "+" },
				{ type: "number", value: 2 },
			]),
		);
		expect(ast).toMatchObject({ type: "binary", op: "+" });
	});

	it("parses parentheses", () => {
		const ast = parseDiceFormula(
			tokens([
				{ type: "paren", value: "(" },
				{ type: "number", value: 1 },
				{ type: "d" },
				{ type: "number", value: 4 },
				{ type: "op", value: "+" },
				{ type: "number", value: 2 },
				{ type: "paren", value: ")" },
			]),
		);
		expect(ast).toMatchObject({ type: "binary", op: "+" });
	});

	it("throws on mismatched parens", () => {
		expect(() =>
			parseDiceFormula(
				tokens([
					{ type: "paren", value: "(" },
					{ type: "number", value: 1 },
					{ type: "d" },
					{ type: "number", value: 6 },
					{ type: "op", value: "+" },
					{ type: "number", value: 2 },
				]),
			),
		).toThrow();
		expect(() =>
			parseDiceFormula(
				tokens([
					{ type: "number", value: 1 },
					{ type: "d" },
					{ type: "number", value: 6 },
					{ type: "op", value: "+" },
					{ type: "number", value: 2 },
					{ type: "paren", value: ")" },
				]),
			),
		).toThrow();
	});

	it("throws on invalid input", () => {
		expect(() =>
			parseDiceFormula(
				tokens([
					{ type: "number", value: 1 },
					{ type: "d" },
					{ type: "number", value: 6 },
					// Simulate an invalid token type
					{ type: "op", value: "$" as unknown as "+" },
				]),
			),
		).toThrow();
	});
});
