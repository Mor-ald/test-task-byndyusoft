import { test, expect, describe } from "@jest/globals";
import { parseExpression } from "../../utilities/parseExpression";

describe("parseAndCalcExpression", () => {
	test("Test '+'", () => {
		const result = parseExpression("1+2+7.1");
		expect(result).toBe("10.1");
	});

	test("Test '-'", () => {
		const result = parseExpression("1-2");
		expect(result).toBe("-1");
	});

	test("Test '*'", () => {
		const result = parseExpression("2*5.2");
		expect(result).toBe("10.4");
	});

	test("Test '/'", () => {
		const result = parseExpression("33/5");
		expect(result).toBe("6.6");
	});

	test("Test '%'", () => {
		const result = parseExpression("33%5");
		expect(result).toBe("3");
	});

	test("Test '√'", () => {
		const result = parseExpression("√49");
		expect(result).toBe("7");
	});

	test("Test expression with '(' and ')'", () => {
		const result = parseExpression("1+5*(7-2)+50.2");
		expect(result).toBe("76.2");
	});
});
