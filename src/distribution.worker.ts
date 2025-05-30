import { calculateDistributionFromFormula } from "./math/dice-math";

self.onmessage = (e: MessageEvent) => {
	const formula = e.data as string;
	try {
		const dist = calculateDistributionFromFormula(formula);
		// Map is not serializable, so convert to array
		self.postMessage({ type: "success", distribution: Array.from(dist.entries()) });
	} catch (err) {
		self.postMessage({ type: "error", error: err instanceof Error ? err.message : String(err) });
	}
};
