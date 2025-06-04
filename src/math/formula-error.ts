export class FormulaError extends Error {
	constructor(
		public index: number,
		message: string,
	) {
		super(`Formula error at character ${index}: ${message}`);
		this.name = "FormulaError";
	}
}
