import { tokenize } from "./tokenizer";
import { describe, expect, it } from "vitest";

describe("tokenizer", () => {
	it("tokenizes simple dice formula", () => {
		const tokens = tokenize("2d6");
		expect(tokens).toEqual([
			{ type: "number", value: 2, index: 0 },
			{ type: "d", index: 1 },
			{ type: "number", value: 6, index: 2 },
			{ type: "eof", index: 3 },
		]);
	});

	it("tokenizes keep highest/lowest", () => {
		const tokens = tokenize("4d6kh3");
		expect(tokens).toEqual([
			{ type: "number", value: 4, index: 0 },
			{ type: "d", index: 1 },
			{ type: "number", value: 6, index: 2 },
			{ type: "keep", value: "kh", index: 3 },
			{ type: "number", value: 3, index: 5 },
			{ type: "eof", index: 6 },
		]);
		const tokens2 = tokenize("4d6kl2");
		expect(tokens2).toEqual([
			{ type: "number", value: 4, index: 0 },
			{ type: "d", index: 1 },
			{ type: "number", value: 6, index: 2 },
			{ type: "keep", value: "kl", index: 3 },
			{ type: "number", value: 2, index: 5 },
			{ type: "eof", index: 6 },
		]);
	});

	it("tokenizes operators and parens", () => {
		const tokens = tokenize("1d4 + (2 * 3)");
		expect(tokens).toEqual([
			{ type: "number", value: 1, index: 0 },
			{ type: "d", index: 1 },
			{ type: "number", value: 4, index: 2 },
			{ type: "op", value: "+", index: 4 },
			{ type: "paren", value: "(", index: 6 },
			{ type: "number", value: 2, index: 7 },
			{ type: "op", value: "*", index: 9 },
			{ type: "number", value: 3, index: 11 },
			{ type: "paren", value: ")", index: 12 },
			{ type: "eof", index: 13 },
		]);
	});

	it("skips whitespace", () => {
		const tokens = tokenize(" 1d6 \n + 2 ");
		expect(tokens).toEqual([
			{ type: "number", value: 1, index: 1 },
			{ type: "d", index: 2 },
			{ type: "number", value: 6, index: 3 },
			{ type: "op", value: "+", index: 7 },
			{ type: "number", value: 2, index: 9 },
			{ type: "eof", index: 11 },
		]);
	});

	it("throws on invalid character", () => {
		expect(() => tokenize("1d6$")).toThrow();
	});
});
