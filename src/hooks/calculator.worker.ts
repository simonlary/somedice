import { calculateProbabilityDistribution } from "./calculate-probability-distribution";
import { expose } from "comlink";

export class Calculator {
	calculateExpressionProbabilityDistribution(expression: string) {
		return calculateProbabilityDistribution(expression);
	}
}

expose(new Calculator());
