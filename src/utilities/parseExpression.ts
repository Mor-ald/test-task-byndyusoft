import operators from "../constants/operators";
import { calc } from "./calc";

/**
 * A function to parse an expression into an array of numbers and operators.
 * @param expression
 */
export function parseExpression(expression: string) {
	const parts = [];
	let acc = "";

	for (let i = 0; i < expression.length; i++) {
		const char = expression[i];

		// Add number or operator to parts
		if (operators.includes(char)) {
			if (acc.length > 0) {
				parts.push(acc);
				acc = "";
			}

			parts.push(char);
		} else acc += char;

		if (i === expression.length - 1 && acc) parts.push(acc);
	}

	return calc(parts).split(",").join(".");
}
