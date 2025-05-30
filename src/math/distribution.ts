import { ASTNode, BinaryOpNode, DiceNode, KeepDiceNode, NumberNode } from "./ast";

export function calculateDistribution(ast: ASTNode): Map<number, number> {
	return evalNode(ast);
}

function evalNode(node: ASTNode): Map<number, number> {
	switch (node.type) {
		case "number":
			return evalNumberNode(node);
		case "binary":
			return evalBinaryNode(node);
		case "dice":
			return evalDiceNode(node);
	}
}

function evalNumberNode(node: NumberNode): Map<number, number> {
	return new Map([[node.value, 1]]);
}

function evalBinaryNode(node: BinaryOpNode): Map<number, number> {
	const left = evalNode(node.left);
	const right = evalNode(node.right);
	switch (node.op) {
		case "+":
			return addDistributions(left, right);
		case "-":
			return subtractDistributions(left, right);
		case "*":
			return multiplyDistributions(left, right);
		case "/":
			return divideDistributions(left, right);
	}
}

function evalDiceNode(diceNode: DiceNode): Map<number, number> {
	if (diceNode.count === 0) return new Map([[0, 1]]);
	const diceDist = uniformDiceDistribution(diceNode.sides);
	if (diceNode.keep) {
		return keepDiceDistribution(diceNode);
	}
	return combineNDice(diceDist, diceNode.count);
}

function uniformDiceDistribution(sides: number): Map<number, number> {
	if (sides === 0) throw new Error("Cannot roll a die with 0 sides");
	const dist = new Map<number, number>();
	for (let i = 1; i <= sides; i++) dist.set(i, 1 / sides);
	return dist;
}

function keepDiceDistribution(diceNode: KeepDiceNode): Map<number, number> {
	if (diceNode.keep.count > diceNode.count) throw new Error("Cannot keep more dice than rolled");

	const total = Math.pow(diceNode.sides, diceNode.count);
	const resultDist = new Map<number, number>();

	function* rollGen(roll: number[] = []): Generator<number[]> {
		if (roll.length === diceNode.count) {
			yield roll.slice();
			return;
		}
		for (let i = 1; i <= diceNode.sides; i++) {
			roll.push(i);
			yield* rollGen(roll);
			roll.pop();
		}
	}

	for (const roll of rollGen()) {
		const sorted = diceNode.keep.type === "kh" ? roll.slice().sort((a, b) => b - a) : roll.slice().sort((a, b) => a - b);
		const kept = sorted.slice(0, diceNode.keep.count).reduce((a, b) => a + b, 0);
		resultDist.set(kept, (resultDist.get(kept) ?? 0) + 1 / total);
	}
	return resultDist;
}

function combineNDice(diceDist: Map<number, number>, count: number): Map<number, number> {
	let combined = diceDist;
	for (let i = 1; i < count; i++) {
		combined = addDistributions(combined, diceDist);
	}
	return combined;
}

function addDistributions(dist1: Map<number, number>, dist2: Map<number, number>): Map<number, number> {
	const combined = new Map<number, number>();
	for (const [sum1, prob1] of dist1.entries()) {
		for (const [sum2, prob2] of dist2.entries()) {
			const newSum = sum1 + sum2;
			combined.set(newSum, (combined.get(newSum) ?? 0) + prob1 * prob2);
		}
	}
	return combined;
}

function subtractDistributions(dist1: Map<number, number>, dist2: Map<number, number>): Map<number, number> {
	const combined = new Map<number, number>();
	for (const [sum1, prob1] of dist1.entries()) {
		for (const [sum2, prob2] of dist2.entries()) {
			const newSum = sum1 - sum2;
			combined.set(newSum, (combined.get(newSum) ?? 0) + prob1 * prob2);
		}
	}
	return combined;
}

function multiplyDistributions(dist1: Map<number, number>, dist2: Map<number, number>): Map<number, number> {
	const combined = new Map<number, number>();
	for (const [v1, p1] of dist1.entries()) {
		for (const [v2, p2] of dist2.entries()) {
			const prod = v1 * v2;
			combined.set(prod, (combined.get(prod) ?? 0) + p1 * p2);
		}
	}
	return combined;
}

function divideDistributions(dist1: Map<number, number>, dist2: Map<number, number>): Map<number, number> {
	const combined = new Map<number, number>();
	for (const [v1, p1] of dist1.entries()) {
		for (const [v2, p2] of dist2.entries()) {
			if (v2 === 0) throw new Error("Division by zero");
			const div = Math.floor(v1 / v2);
			combined.set(div, (combined.get(div) ?? 0) + p1 * p2);
		}
	}
	return combined;
}
