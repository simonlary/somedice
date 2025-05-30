export type Token =
	| { type: "number"; value: number }
	| { type: "d" }
	| { type: "keep"; value: "kh" | "kl" }
	| { type: "op"; value: "+" | "-" | "*" | "/" }
	| { type: "paren"; value: "(" | ")" }
	| { type: "eof" };
