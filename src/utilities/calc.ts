/**
 * A function to calculate result from parts of expression
 * @param parts
 * @returns {*} ```string```
 */
export function calc(parts: string[]): string {
	let lastIndexOfOpenParenthesis = -1;
	let lastIndexOfCloseParenthesis = -1;

	for (let i = 0; i < parts.length; i++) {
		if (parts[i] === "(") lastIndexOfOpenParenthesis = i;
		if (parts[i] === ")") lastIndexOfCloseParenthesis = i;
	}

	// Logic for expressions in parentheses
	if (lastIndexOfOpenParenthesis !== -1 && lastIndexOfCloseParenthesis !== -1) {
		// Calculate sub expression
		const subParts = parts.slice(lastIndexOfOpenParenthesis + 1, lastIndexOfCloseParenthesis);
		const subCalc = calc(subParts);
		const newParts = [...parts.slice(0, lastIndexOfOpenParenthesis), `${subCalc}`, ...parts.slice(lastIndexOfCloseParenthesis + 1)];

		return calc(newParts);
	}

	// Calculate sqrt
	for (let i = 0; i < parts.length; i++) {
		if (parts[i] === "√") {
			const number = `${Math.sqrt(Number(parts[i + 1]))}`;
			parts = [...parts.slice(0, i), number, ...parts.slice(i + 2)];
			i -= 2;
		}
	}

	// Calculate "*" and "/"
	for (let i = 0; i < parts.length; i++) {
		if (parts[i] === "*") parts[i - 1] = `${Number(parts[i - 1]) * Number(parts[i + 1])}`;
		if (parts[i] === "/") parts[i - 1] = `${Number(parts[i - 1]) / Number(parts[i + 1])}`;

		if (parts[i] === "*" || parts[i] === "/") {
			parts.splice(i, 2);
			i--;
		}
	}

	// Calculate "+", "-", "%"
	for (let i = 0; i < parts.length; i++) {
		if (parts[i] === "+") parts[i - 1] = `${Number(parts[i - 1]) + Number(parts[i + 1])}`;
		if (parts[i] === "-") parts[i - 1] = `${Number(parts[i - 1]) - Number(parts[i + 1])}`;
		if (parts[i] === "%") parts[i - 1] = `${Number(parts[i - 1]) % Number(parts[i + 1])}`;

		if (parts[i] === "+" || parts[i] === "-" || parts[i] === "%") {
			parts.splice(i, 2);
			i--;
		}
	}

	return parts[0];
}
