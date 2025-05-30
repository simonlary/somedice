import { tokenize } from "./tokenizer";
import { describe, expect, it } from "vitest";

describe("tokenizer", () => {
	it("tokenizes simple dice formula", () => {
		const tokens = tokenize("2d6");
		expect(tokens).toEqual([{ type: "number", value: 2 }, { type: "d" }, { type: "number", value: 6 }, { type: "eof" }]);
	});

	it("tokenizes keep highest/lowest", () => {
		const tokens = tokenize("4d6kh3");
		expect(tokens).toEqual([
			{ type: "number", value: 4 },
			{ type: "d" },
			{ type: "number", value: 6 },
			{ type: "keep", value: "kh" },
			{ type: "number", value: 3 },
			{ type: "eof" },
		]);
		const tokens2 = tokenize("4d6kl2");
		expect(tokens2).toEqual([
			{ type: "number", value: 4 },
			{ type: "d" },
			{ type: "number", value: 6 },
			{ type: "keep", value: "kl" },
			{ type: "number", value: 2 },
			{ type: "eof" },
		]);
	});

	it("tokenizes operators and parens", () => {
		const tokens = tokenize("1d4 + (2 * 3)");
		expect(tokens).toEqual([
			{ type: "number", value: 1 },
			{ type: "d" },
			{ type: "number", value: 4 },
			{ type: "op", value: "+" },
			{ type: "paren", value: "(" },
			{ type: "number", value: 2 },
			{ type: "op", value: "*" },
			{ type: "number", value: 3 },
			{ type: "paren", value: ")" },
			{ type: "eof" },
		]);
	});

	it("skips whitespace", () => {
		const tokens = tokenize(" 1d6 \n + 2 ");
		expect(tokens).toEqual([
			{ type: "number", value: 1 },
			{ type: "d" },
			{ type: "number", value: 6 },
			{ type: "op", value: "+" },
			{ type: "number", value: 2 },
			{ type: "eof" },
		]);
	});

	it("throws on invalid character", () => {
		expect(() => tokenize("1d6$")).toThrow();
	});
});
