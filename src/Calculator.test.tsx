import { fireEvent, render, screen } from "@testing-library/react";

import { beforeEach, describe, expect, test } from "@jest/globals";
import Calculator from "./Calculator";

describe("Calculator's tests", () => {
	beforeEach(() => {
		render(<Calculator />);
	});

	describe("Calculator rendering", () => {
		test("Calculator has className equal calc", () => {
			expect(screen.getByTestId("calc").className).toBe("calc");
		});

		test("Calculator has button with labels: C, √, %, /, 7, 8, 9, ×, 4, 5, 6, -, 1, 2, 3, +, 00, 0, ',', =", () => {
			expect(screen.getByText("C").innerHTML).toBe("C");
			expect(screen.getByText("√").innerHTML).toBe("√");
			expect(screen.getByText("%").innerHTML).toBe("%");
			expect(screen.getByText("/").innerHTML).toBe("/");
			expect(screen.getByText("7").innerHTML).toBe("7");
			expect(screen.getByText("8").innerHTML).toBe("8");
			expect(screen.getByText("9").innerHTML).toBe("9");
			expect(screen.getByText("×").innerHTML).toBe("×");
			expect(screen.getByText("4").innerHTML).toBe("4");
			expect(screen.getByText("5").innerHTML).toBe("5");
			expect(screen.getByText("6").innerHTML).toBe("6");
			expect(screen.getByText("-").innerHTML).toBe("-");
			expect(screen.getByText("1").innerHTML).toBe("1");
			expect(screen.getByText("2").innerHTML).toBe("2");
			expect(screen.getByText("3").innerHTML).toBe("3");
			expect(screen.getByText("+").innerHTML).toBe("+");
			expect(screen.getByText("00").innerHTML).toBe("00");
			expect(screen.getByText("0").innerHTML).toBe("0");
			expect(screen.getByText(",").innerHTML).toBe(",");
			expect(screen.getByText("=").innerHTML).toBe("=");
		});
	});

	describe("Clear function test", () => {
		beforeEach(() => {
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText("+"));
			fireEvent.click(screen.getByText("2"));
			fireEvent.click(screen.getByText("="));
		});

		test("Clear by button", () => {
			fireEvent.click(screen.getByText("C"));

			expect(screen.getByTestId("value-container").innerHTML).toBe("");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("");
		});

		test("Clear by keyboard", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { keyCode: 27 });

			expect(screen.getByTestId("value-container").innerHTML).toBe("");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("");
		});
	});

	describe("'Calculate' function tests", () => {
		test("Disable second calculate", () => {
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText("+"));
			fireEvent.click(screen.getByText("3"));
			fireEvent.click(screen.getByText("="));

			expect(screen.getByTestId("value-container").innerHTML).toBe("4");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("1+3=");
		});

		test("Test sum", () => {
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText("2"));
			fireEvent.click(screen.getByText("3"));
			fireEvent.click(screen.getByText("+"));
			fireEvent.click(screen.getByText("4"));
			fireEvent.click(screen.getByText("5"));
			fireEvent.click(screen.getByText("6"));
			fireEvent.click(screen.getByText(","));
			fireEvent.click(screen.getByText("7"));
			fireEvent.click(screen.getByText("2"));
			fireEvent.click(screen.getByText("3"));

			fireEvent.click(screen.getByText("="));

			expect(screen.getByTestId("value-container").innerHTML).toBe("579.723");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("123+456,723=");
		});

		test("Test subtraction", () => {
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText("2"));
			fireEvent.click(screen.getByText("3"));
			fireEvent.click(screen.getByText("-"));
			fireEvent.click(screen.getByText("4"));
			fireEvent.click(screen.getByText("5"));
			fireEvent.click(screen.getByText("6"));
			fireEvent.click(screen.getByText(","));
			fireEvent.click(screen.getByText("7"));
			fireEvent.click(screen.getByText("2"));
			fireEvent.click(screen.getByText("3"));

			fireEvent.click(screen.getByText("="));

			expect(screen.getByTestId("value-container").innerHTML).toBe("-333.723");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("123-456,723=");
		});

		test("Test multiplication", () => {
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText("0"));
			fireEvent.click(screen.getByText("×"));
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText(","));
			fireEvent.click(screen.getByText("2"));

			fireEvent.click(screen.getByText("="));

			expect(screen.getByTestId("value-container").innerHTML).toBe("12");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("10×1,2=");
		});

		test("Test the remainder of the division", () => {
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText("3"));
			fireEvent.click(screen.getByText("%"));
			fireEvent.click(screen.getByText("3"));

			fireEvent.click(screen.getByText("="));

			expect(screen.getByTestId("value-container").innerHTML).toBe("1");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("13%3=");
		});

		test("Test sqrt", () => {
			fireEvent.click(screen.getByText("4"));
			fireEvent.click(screen.getByText("9"));
			fireEvent.click(screen.getByText("√"));

			fireEvent.click(screen.getByText("="));

			expect(screen.getByTestId("value-container").innerHTML).toBe("7");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("√49=");
		});

		test("Expression with parentheses", () => {
			fireEvent.click(screen.getByText("5"));
			fireEvent.click(screen.getByText("×"));
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "(" });
			fireEvent.click(screen.getByText("4"));
			fireEvent.click(screen.getByText("+"));
			fireEvent.click(screen.getByText("1"));
			fireEvent.keyDown(screen.getByTestId("calc"), { key: ")" });
			fireEvent.click(screen.getByText("="));

			expect(screen.getByTestId("value-container").innerHTML).toBe("25");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("5×(4+1)=");
		});
	});

	describe("'OnKeyDown' function tests", () => {
		test("Test '*' key", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "1" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "*" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "3" });

			expect(screen.getByTestId("value-container").innerHTML).toBe("3");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("1×");
		});

		test("Test operations", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "1" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "/" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "3" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "+" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "5" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "-" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "7" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "%" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "8" });

			expect(screen.getByTestId("value-container").innerHTML).toBe("8");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("1/3+5-7%");
		});

		test("Test numbers", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "1" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "2" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "3" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "4" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "5" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "6" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "7" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "8" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "9" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "0" });

			expect(screen.getByTestId("value-container").innerHTML).toBe("1234567890");
		});

		test("Test '(' and ') keys", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "(" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "1" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "*" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "3" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: ")" });

			expect(screen.getByTestId("value-container").innerHTML).toBe("");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("(1×3)");
		});

		test("Test Escape", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "1" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "*" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "3" });

			fireEvent.keyDown(screen.getByTestId("calc"), { key: "Escape" });

			expect(screen.getByTestId("value-container").innerHTML).toBe("");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("");
		});

		test("Test Enter", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "1" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "+" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "9" });

			fireEvent.keyDown(screen.getByTestId("calc"), { key: "Enter" });

			expect(screen.getByTestId("value-container").innerHTML).toBe("10");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("1+9=");
		});

		test("Test Backspace", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "1" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "+" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "9" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "5" });

			fireEvent.keyDown(screen.getByTestId("calc"), { key: "Backspace" });

			expect(screen.getByTestId("value-container").innerHTML).toBe("9");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("1+");
		});
	});

	describe("'AddNumber' function tests", () => {
		test("Add numbers to current value", () => {
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText("2"));
			fireEvent.click(screen.getByText("3"));
			fireEvent.click(screen.getByText("4"));
			fireEvent.click(screen.getByText("5"));
			fireEvent.click(screen.getByText("6"));
			fireEvent.click(screen.getByText("7"));
			fireEvent.click(screen.getByText("8"));
			fireEvent.click(screen.getByText("9"));
			fireEvent.click(screen.getByText("0"));
			fireEvent.click(screen.getByText("00"));

			expect(screen.getByTestId("value-container").innerHTML).toBe("123456789000");
		});

		test("If current operation equal '1+2=' and user press any number button, then clear currentOperation and set new currentValue", async () => {
			fireEvent.click(screen.getByText("1"));

			fireEvent.click(screen.getByText("+"));
			fireEvent.click(screen.getByText("2"));
			fireEvent.click(screen.getByText("="));

			fireEvent.click(screen.getByText("5"));

			expect(screen.getByTestId("value-container").innerHTML).toBe("5");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("");
		});

		test("Max length of current value is 16", () => {
			const buttonOne = screen.getByText("1");
			for (let i = 0; i < 16; i++) {
				fireEvent.click(buttonOne);
			}

			expect(screen.getByTestId("value-container").innerHTML).toBe("1111111111111111");
		});

		test("If current value is empty, disable add comma", () => {
			fireEvent.click(screen.getByText(","));

			expect(screen.getByTestId("value-container").innerHTML).toBe("");
		});

		test("If current value have comma, disable add second comma", () => {
			fireEvent.click(screen.getByText("0"));
			fireEvent.click(screen.getByText(","));
			fireEvent.click(screen.getByText(","));

			expect(screen.getByTestId("value-container").innerHTML).toBe("0,");
		});

		test("If current value is 0, disable add any number", () => {
			fireEvent.click(screen.getByText("0"));
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText("5"));

			expect(screen.getByTestId("value-container").innerHTML).toBe("0");
		});

		test("If current value is 0, disable add two zero", () => {
			fireEvent.click(screen.getByText("0"));
			fireEvent.click(screen.getByText("00"));

			expect(screen.getByTestId("value-container").innerHTML).toBe("0");
		});

		test("If current value is empty, disable add two zero", () => {
			fireEvent.click(screen.getByText("00"));

			expect(screen.getByTestId("value-container").innerHTML).toBe("0");
		});

		test("If current value is empty, disable add two zero", () => {
			fireEvent.click(screen.getByText("00"));

			expect(screen.getByTestId("value-container").innerHTML).toBe("0");
		});

		test("If current operation equal '1-2=' and user press two zero button, then clear currentOperation and set '0' for currentValue", () => {
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText("-"));
			fireEvent.click(screen.getByText("2"));
			fireEvent.click(screen.getByText("="));

			fireEvent.click(screen.getByText("00"));

			expect(screen.getByTestId("value-container").innerHTML).toBe("0");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("");
		});

		// TODO: Переместить в отдельный describe
		// test("Clear value by button", () => {
		// 	fireEvent.click(ButtonClear);
		// 	expect(currentValueElement.innerHTML).toBe("");
		// });
	});

	describe("'AddOperation' function tests", () => {
		test("Disable add operation with empty current value in empty currentOperation", () => {
			fireEvent.click(screen.getByText("√"));
			fireEvent.click(screen.getByText("+"));
			fireEvent.click(screen.getByText("-"));
			fireEvent.click(screen.getByText("×"));
			fireEvent.click(screen.getByText("%"));

			expect(screen.getByTestId("oper-container").innerHTML).toBe("");
		});

		test("Disable add same operation near", () => {
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText("+"));
			fireEvent.click(screen.getByText("+"));

			expect(screen.getByTestId("value-container").innerHTML).toBe("");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("1+");
		});

		test("Change last operation feature", () => {
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText("+"));
			fireEvent.click(screen.getByText("-"));

			expect(screen.getByTestId("value-container").innerHTML).toBe("");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("1-");
		});

		test("Disable add sqrt to empty string", () => {
			fireEvent.click(screen.getByText("√"));

			expect(screen.getByTestId("value-container").innerHTML).toBe("");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("");
		});

		test("Current value shout be empty after adding new operation", () => {
			fireEvent.click(screen.getByText("1"));
			fireEvent.click(screen.getByText("+"));
			fireEvent.click(screen.getByText("2"));
			fireEvent.click(screen.getByText("-"));

			expect(screen.getByTestId("value-container").innerHTML).toBe("");
			expect(screen.getByTestId("oper-container").innerHTML).toBe("1+2-");
		});
	});

	describe("'addParenthesis' function tests", () => {
		test("Add open parenthesis", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "(" });

			expect(screen.getByTestId("oper-container").innerHTML).toBe("(");
		});

		test("Add close parenthesis", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "(" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "1" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "+" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "2" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: ")" });

			expect(screen.getByTestId("oper-container").innerHTML).toBe("(1+2)");
		});

		test("Disable add close parenthesis with empty current value and empty current operation", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { key: ")" });

			expect(screen.getByTestId("oper-container").innerHTML).toBe("");
		});

		test("Disable add close parenthesis after open parenthesis", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "(" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: ")" });

			expect(screen.getByTestId("oper-container").innerHTML).toBe("(");
		});

		test("Disable add close parenthesis if last char of current operation a operator", () => {
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "(" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "1" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: "+" });
			fireEvent.keyDown(screen.getByTestId("calc"), { key: ")" });

			expect(screen.getByTestId("oper-container").innerHTML).toBe("(1+");
		});
	});
});
