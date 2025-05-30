import type { BinaryOpNode, NormalDiceNode, NumberNode } from "./ast";
import { calculateDistribution } from "./distribution";
import { describe, expect, it } from "vitest";

describe("distribution", () => {
	describe("basic functionality", () => {
		it("returns correct distribution for 1d6", () => {
			const ast: NormalDiceNode = { type: "dice", count: 1, sides: 6, keep: undefined };
			const dist = calculateDistribution(ast);
			expect(dist.size).toBe(6);
			for (let i = 1; i <= 6; i++) {
				expect(dist.get(i)).toBeCloseTo(1 / 6, 5);
			}
		});

		it("returns correct distribution for 2d2", () => {
			const ast: NormalDiceNode = { type: "dice", count: 2, sides: 2, keep: undefined };
			const dist = calculateDistribution(ast);
			expect(dist.get(2)).toBeCloseTo(0.25, 5);
			expect(dist.get(3)).toBeCloseTo(0.5, 5);
			expect(dist.get(4)).toBeCloseTo(0.25, 5);
		});

		it("handles zero dice", () => {
			const ast: NormalDiceNode = { type: "dice", count: 0, sides: 6, keep: undefined };
			const dist = calculateDistribution(ast);
			expect(dist.size).toBe(1);
			expect(dist.get(0)).toBe(1);
		});

		it("throws on zero sides", () => {
			const ast: NormalDiceNode = { type: "dice", count: 1, sides: 0, keep: undefined };
			expect(() => calculateDistribution(ast)).toThrow();
		});
	});

	describe("arithmetic operations", () => {
		it("handles arithmetic: 1d4 + 2", () => {
			const left: NormalDiceNode = { type: "dice", count: 1, sides: 4, keep: undefined };
			const right: NumberNode = { type: "number", value: 2 };
			const ast: BinaryOpNode = { type: "binary", op: "+", left, right };
			const dist = calculateDistribution(ast);
			expect(dist.get(3)).toBeCloseTo(0.25, 5);
			expect(dist.get(6)).toBeCloseTo(0.25, 5);
		});
	});

	describe("edge cases", () => {
		it("handles 1d1 (always 1)", () => {
			const ast: NormalDiceNode = { type: "dice", count: 1, sides: 1, keep: undefined };
			const dist = calculateDistribution(ast);
			expect(dist.size).toBe(1);
			expect(dist.get(1)).toBe(1);
		});

		it("handles 2d1 (always 2)", () => {
			const ast: NormalDiceNode = { type: "dice", count: 2, sides: 1, keep: undefined };
			const dist = calculateDistribution(ast);
			expect(dist.size).toBe(1);
			expect(dist.get(2)).toBe(1);
		});

		it("handles 0d1 (always 0)", () => {
			const ast: NormalDiceNode = { type: "dice", count: 0, sides: 1, keep: undefined };
			const dist = calculateDistribution(ast);
			expect(dist.size).toBe(1);
			expect(dist.get(0)).toBe(1);
		});

		it("handles negative number node", () => {
			const ast: NumberNode = { type: "number", value: -5 };
			const dist = calculateDistribution(ast);
			expect(dist.size).toBe(1);
			expect(dist.get(-5)).toBe(1);
		});

		it("handles negative result in binary op", () => {
			const left: NumberNode = { type: "number", value: 1 };
			const right: NormalDiceNode = { type: "dice", count: 2, sides: 2, keep: undefined };
			const ast: BinaryOpNode = { type: "binary", op: "-", left, right };
			const dist = calculateDistribution(ast);
			expect(dist.get(-1)).toBeCloseTo(0.25, 5);
			expect(dist.get(-2)).toBeCloseTo(0.5, 5);
			expect(dist.get(-3)).toBeCloseTo(0.25, 5);
		});

		it("throws on division by zero in binary op", () => {
			const left: NormalDiceNode = { type: "dice", count: 1, sides: 6, keep: undefined };
			const right: NumberNode = { type: "number", value: 0 };
			const ast: BinaryOpNode = { type: "binary", op: "/", left, right };
			expect(() => calculateDistribution(ast)).toThrow();
		});
	});
});
