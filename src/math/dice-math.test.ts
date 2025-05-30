import { calculateDistributionFromFormula } from "./dice-math";
import { describe, expect, it } from "vitest";

function expectDistribution(formula: string, expected: Record<number, number>) {
	const dist = calculateDistributionFromFormula(formula);
	expect(dist.size).toBe(Object.keys(expected).length);
	for (const [sum, prob] of Object.entries(expected)) {
		expect(dist.get(Number(sum))).toBeCloseTo(prob, 0.0001);
	}
}

describe("calculateDistributionFromFormula", () => {
	it("should return correct distribution for '1d6'", () => {
		expectDistribution("1d6", { 1: 1 / 6, 2: 1 / 6, 3: 1 / 6, 4: 1 / 6, 5: 1 / 6, 6: 1 / 6 });
	});

	it("should return correct distribution for '2d6'", () => {
		expectDistribution("2d6", {
			2: 1 / 36,
			3: 2 / 36,
			4: 3 / 36,
			5: 4 / 36,
			6: 5 / 36,
			7: 6 / 36,
			8: 5 / 36,
			9: 4 / 36,
			10: 3 / 36,
			11: 2 / 36,
			12: 1 / 36,
		});
	});

	it("should handle addition: '1d4 + 2'", () => {
		expectDistribution("1d4 + 2", { 3: 0.25, 4: 0.25, 5: 0.25, 6: 0.25 });
	});

	it("should handle subtraction: '1d4 - 1'", () => {
		expectDistribution("1d4 - 1", { 0: 0.25, 1: 0.25, 2: 0.25, 3: 0.25 });
	});

	it("should handle multiplication: '2 * 1d4'", () => {
		expectDistribution("2 * 1d4", { 2: 0.25, 4: 0.25, 6: 0.25, 8: 0.25 });
	});

	it("should handle division: '4 / 1d4'", () => {
		expectDistribution("4 / 1d4", { 4: 0.25, 2: 0.25, 1: 0.5 });
	});

	it("should throw on invalid formula", () => {
		expect(() => calculateDistributionFromFormula("1d6 + ")).toThrow();
		expect(() => calculateDistributionFromFormula("foo")).toThrow();
	});

	it("should handle keep highest: '2d6kh1'", () => {
		expectDistribution("2d6kh1", {
			1: 1 / 36,
			2: 3 / 36,
			3: 5 / 36,
			4: 7 / 36,
			5: 9 / 36,
			6: 11 / 36,
		});
	});
	it("should handle keep lowest: '2d6kl1'", () => {
		expectDistribution("2d6kl1", {
			1: 11 / 36,
			2: 9 / 36,
			3: 7 / 36,
			4: 5 / 36,
			5: 3 / 36,
			6: 1 / 36,
		});
	});
	it("should handle keep highest: '2d20kh1'", () => {
		expectDistribution("2d20kh1", {
			1: 1 / 400,
			2: 3 / 400,
			3: 5 / 400,
			4: 7 / 400,
			5: 9 / 400,
			6: 11 / 400,
			7: 13 / 400,
			8: 15 / 400,
			9: 17 / 400,
			10: 19 / 400,
			11: 21 / 400,
			12: 23 / 400,
			13: 25 / 400,
			14: 27 / 400,
			15: 29 / 400,
			16: 31 / 400,
			17: 33 / 400,
			18: 35 / 400,
			19: 37 / 400,
			20: 39 / 400,
		});
	});
	it("should handle keep lowest: '2d20kl1'", () => {
		expectDistribution("2d20kl1", {
			1: 39 / 400,
			2: 37 / 400,
			3: 35 / 400,
			4: 33 / 400,
			5: 31 / 400,
			6: 29 / 400,
			7: 27 / 400,
			8: 25 / 400,
			9: 23 / 400,
			10: 21 / 400,
			11: 19 / 400,
			12: 17 / 400,
			13: 15 / 400,
			14: 13 / 400,
			15: 11 / 400,
			16: 9 / 400,
			17: 7 / 400,
			18: 5 / 400,
			19: 3 / 400,
			20: 1 / 400,
		});
	});
	it("should handle keep highest: '3d6kh2'", () => {
		expectDistribution("3d6kh2", {
			2: 1 / 216,
			3: 3 / 216,
			4: 7 / 216,
			5: 15 / 216,
			6: 27 / 216,
			7: 43 / 216,
			8: 63 / 216,
			9: 80 / 216,
			10: 90 / 216,
			11: 87 / 216,
			12: 73 / 216,
		});
	});
	it("should handle keep lowest: '3d6kl2'", () => {
		expectDistribution("3d6kl2", {
			2: 1 / 216,
			3: 3 / 216,
			4: 7 / 216,
			5: 15 / 216,
			6: 27 / 216,
			7: 43 / 216,
			8: 63 / 216,
			9: 80 / 216,
			10: 90 / 216,
			11: 87 / 216,
			12: 73 / 216,
		});
	});
	it("should handle keep highest in a complex formula: '2d6kh1 + 1d4'", () => {
		expectDistribution("2d6kh1 + 1d4", {
			2: 1 / 144,
			3: 4 / 144,
			4: 9 / 144,
			5: 16 / 144,
			6: 24 / 144,
			7: 32 / 144,
			8: 27 / 144,
			9: 20 / 144,
			10: 11 / 144,
		});
	});
	it("should handle keep lowest in a complex formula: '2d6kl1 * 2'", () => {
		expectDistribution("2d6kl1 * 2", {
			2: 11 / 36,
			4: 9 / 36,
			6: 7 / 36,
			8: 5 / 36,
			10: 3 / 36,
			12: 1 / 36,
		});
	});
	it("should handle zero dice: '0d6'", () => {
		expectDistribution("0d6", { 0: 1 });
	});
	it("should throw on zero sides: '1d0'", () => {
		expect(() => calculateDistributionFromFormula("1d0")).toThrow();
	});
	it("should throw on negative sides: '1d-6'", () => {
		expect(() => calculateDistributionFromFormula("1d-6")).toThrow();
	});
	it("should throw on division by zero: '1d6 / 0'", () => {
		expect(() => calculateDistributionFromFormula("1d6 / 0")).toThrow();
	});
	it("should throw if keep count is greater than dice count: '2d6kh3'", () => {
		expect(() => calculateDistributionFromFormula("2d6kh3")).toThrow();
	});
	it("should handle parentheses and precedence: '1d4 + (2 * 3)'", () => {
		expectDistribution("1d4 + (2 * 3)", { 7: 0.25, 8: 0.25, 9: 0.25, 10: 0.25 });
	});
	it("should handle single number input: '5'", () => {
		expectDistribution("5", { 5: 1 });
	});
	it("should handle negative result: '1 - 2d2'", () => {
		expectDistribution("1 - 2d2", { "-1": 0.25, "-2": 0.5, "-3": 0.25 });
	});
	it("should handle chained operations: '1d4 + 2 * 3'", () => {
		expectDistribution("1d4 + 2 * 3", { 7: 0.25, 8: 0.25, 9: 0.25, 10: 0.25 });
	});
	it("should throw on invalid keep syntax: '2d6kx1'", () => {
		expect(() => calculateDistributionFromFormula("2d6kx1")).toThrow();
	});
	it("should handle 1d1 (always 1)", () => {
		expectDistribution("1d1", { 1: 1 });
	});
	it("should handle 2d1 (always 2)", () => {
		expectDistribution("2d1", { 2: 1 });
	});
	it("should handle 0d1 (always 0)", () => {
		expectDistribution("0d1", { 0: 1 });
	});
	it("should handle negative numbers in arithmetic: '2d2 - 5'", () => {
		expectDistribution("2d2 - 5", { "-3": 0.25, "-2": 0.5, "-1": 0.25 });
	});
	it("should handle nested parentheses: '(1d4 + (1d4 + 1))'", () => {
		expectDistribution("(1d4 + (1d4 + 1))", {
			3: 0.0625,
			4: 0.125,
			5: 0.1875,
			6: 0.25,
			7: 0.1875,
			8: 0.125,
			9: 0.0625,
		});
	});
	it("should handle keep highest with keep count equal to dice count: '3d6kh3'", () => {
		expectDistribution("3d6kh3", {
			3: 1 / 216,
			4: 3 / 216,
			5: 7 / 216,
			6: 15 / 216,
			7: 27 / 216,
			8: 43 / 216,
			9: 63 / 216,
			10: 80 / 216,
			11: 90 / 216,
			12: 87 / 216,
			13: 73 / 216,
			14: 51 / 216,
			15: 27 / 216,
			16: 15 / 216,
			17: 7 / 216,
			18: 1 / 216,
		});
	});
	it("should handle keep lowest with keep count equal to dice count: '3d6kl3'", () => {
		expectDistribution("3d6kl3", {
			3: 1 / 216,
			4: 3 / 216,
			5: 7 / 216,
			6: 15 / 216,
			7: 27 / 216,
			8: 43 / 216,
			9: 63 / 216,
			10: 80 / 216,
			11: 90 / 216,
			12: 87 / 216,
			13: 73 / 216,
			14: 51 / 216,
			15: 27 / 216,
			16: 15 / 216,
			17: 7 / 216,
			18: 1 / 216,
		});
	});
	it("should handle keep with count zero: '2d6kh0'", () => {
		expectDistribution("2d6kh0", { 0: 1 });
	});
	it("should throw on keep count greater than dice count: '1d6kl2'", () => {
		expect(() => calculateDistributionFromFormula("1d6kl2")).toThrow();
	});
	it("should throw on empty input", () => {
		expect(() => calculateDistributionFromFormula("")).toThrow();
	});
	it("should throw on only whitespace input", () => {
		expect(() => calculateDistributionFromFormula("   ")).toThrow();
	});
	it("should throw on invalid characters: '1d6$'", () => {
		expect(() => calculateDistributionFromFormula("1d6$")).toThrow();
	});
	it("should throw on mismatched parentheses: '(1d6 + 2'", () => {
		expect(() => calculateDistributionFromFormula("(1d6 + 2")).toThrow();
	});
	it("should throw on mismatched parentheses: '1d6 + 2)'", () => {
		expect(() => calculateDistributionFromFormula("1d6 + 2)")).toThrow();
	});
});
