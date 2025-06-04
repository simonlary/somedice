import { parse } from "./parser";
import type { Token } from "./token";
import { describe, expect, it } from "vitest";

function tokens(arr: Token[]): Token[] {
	return [...arr, { type: "eof", index: arr.length }];
}

describe("parser", () => {
	it("parses a simple dice formula", () => {
		const ast = parse(
			tokens([
				{ type: "number", value: 2, index: 0 },
				{ type: "d", index: 1 },
				{ type: "number", value: 6, index: 2 },
			]),
		);
		expect(ast).toMatchObject({ type: "dice", count: 2, sides: 6 });
	});

	it("parses keep highest", () => {
		const ast = parse(
			tokens([
				{ type: "number", value: 4, index: 0 },
				{ type: "d", index: 1 },
				{ type: "number", value: 6, index: 2 },
				{ type: "keep", value: "kh", index: 3 },
				{ type: "number", value: 3, index: 4 },
			]),
		);
		expect(ast).toMatchObject({ type: "dice", count: 4, sides: 6, keep: { type: "kh", count: 3 } });
	});

	it("parses arithmetic expressions", () => {
		const ast = parse(
			tokens([
				{ type: "number", value: 1, index: 0 },
				{ type: "d", index: 1 },
				{ type: "number", value: 4, index: 2 },
				{ type: "op", value: "+", index: 3 },
				{ type: "number", value: 2, index: 4 },
			]),
		);
		expect(ast).toMatchObject({ type: "binary", op: "+" });
	});

	it("parses parentheses", () => {
		const ast = parse(
			tokens([
				{ type: "paren", value: "(", index: 0 },
				{ type: "number", value: 1, index: 1 },
				{ type: "d", index: 2 },
				{ type: "number", value: 4, index: 3 },
				{ type: "op", value: "+", index: 4 },
				{ type: "number", value: 2, index: 5 },
				{ type: "paren", value: ")", index: 6 },
			]),
		);
		expect(ast).toMatchObject({ type: "binary", op: "+" });
	});

	it("throws on mismatched parens", () => {
		expect(() =>
			parse(
				tokens([
					{ type: "paren", value: "(", index: 0 },
					{ type: "number", value: 1, index: 1 },
					{ type: "d", index: 2 },
					{ type: "number", value: 6, index: 3 },
					{ type: "op", value: "+", index: 4 },
					{ type: "number", value: 2, index: 5 },
				]),
			),
		).toThrow();
		expect(() =>
			parse(
				tokens([
					{ type: "number", value: 1, index: 0 },
					{ type: "d", index: 1 },
					{ type: "number", value: 6, index: 2 },
					{ type: "op", value: "+", index: 3 },
					{ type: "number", value: 2, index: 4 },
					{ type: "paren", value: ")", index: 5 },
				]),
			),
		).toThrow();
	});

	it("throws on invalid input", () => {
		expect(() =>
			parse(
				tokens([
					{ type: "number", value: 1, index: 0 },
					{ type: "d", index: 1 },
					{ type: "number", value: 6, index: 2 },
					// Simulate an invalid token type
					{ type: "op", value: "$" as unknown as "+", index: 3 },
				]),
			),
		).toThrow();
	});
});
