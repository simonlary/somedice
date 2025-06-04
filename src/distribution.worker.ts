import { calculateDistributionFromFormula } from "./math/dice-math";
import { FormulaError } from "./math/formula-error";

self.onmessage = (e: MessageEvent) => {
	const formula = e.data as string;
	try {
		const dist = calculateDistributionFromFormula(formula);
		// Map is not serializable, so convert to array
		self.postMessage({ type: "success", distribution: Array.from(dist.entries()) });
	} catch (err) {
		if (err instanceof FormulaError) {
			self.postMessage({ type: "error", error: err.message, index: err.index });
		} else {
			self.postMessage({ type: "error", error: err instanceof Error ? err.message : String(err) });
		}
	}
};
