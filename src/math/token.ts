export interface BaseToken {
	index: number;
}

export interface NumberToken extends BaseToken {
	type: "number";
	value: number;
}

export interface DToken extends BaseToken {
	type: "d";
}

export interface KeepToken extends BaseToken {
	type: "keep";
	value: "kh" | "kl";
}

export interface OpToken extends BaseToken {
	type: "op";
	value: "+" | "-" | "*" | "/";
}

export interface ParenToken extends BaseToken {
	type: "paren";
	value: "(" | ")";
}

export interface EofToken extends BaseToken {
	type: "eof";
}

export type Token = NumberToken | DToken | KeepToken | OpToken | ParenToken | EofToken;
