export type ASTNode = DiceNode | NumberNode | BinaryOpNode;

export type DiceNode = NormalDiceNode | KeepDiceNode;

export interface NormalDiceNode {
	type: "dice";
	count: number;
	sides: number;
	keep: undefined;
}

export interface KeepDiceNode {
	type: "dice";
	count: number;
	sides: number;
	keep: KeepData;
}

export interface KeepData {
	type: "kh" | "kl";
	count: number;
}

export interface NumberNode {
	type: "number";
	value: number;
}

export interface BinaryOpNode {
	type: "binary";
	op: "+" | "-" | "*" | "/";
	left: ASTNode;
	right: ASTNode;
}
