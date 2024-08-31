import { useCallback, useEffect, useRef, useState } from "react";
import "./Calculator.css";

import { Button, ButtonsBar, ButtonsPanel, Container, CurrentOperation, CurrentValue, TopPanel } from "./components/components";
import { parseExpression } from "./utilities/parseExpression";
import operations from "./constants/operations";
import keyboardKeys from "./constants/keyboardKeys";

/**
 * Calculator component
 */
export default function Calculator() {
	const [currentOperation, setCurrentOperation] = useState("");
	const [currentValue, setCurrentValue] = useState("");
	const calcRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		calcRef.current?.focus();
	});

	/**
	 * Clear current value and operation
	 * @param label - label of button or key of keyBoard button
	 */
	const clear = (label: string) => {
		if (label === "C" || label === "Escape") {
			setCurrentValue("");
			setCurrentOperation("");
		}
	};

	/**
	 * Calculate value from current operation
	 * @param label - label of button or key of keyBoard button
	 */
	const calculate = (label: string) => {
		// Disable of calculation after the calculation has been performed
		if (currentOperation.at(-1) === "=") return;

		// Enable calculate if label is "=" or label is "Enter"
		if (label === "=" || label === "Enter") {
			// Prepare string to calculate
			const stringToCalc = (currentOperation + currentValue)
				.split("")
				.map((char) => char.replace(",", ".").replace("×", "*"))
				.join("");

			// Add char "=" to end of current operation
			setCurrentOperation((prevValue) => prevValue + currentValue + "=");

			// Set new current value as result of calculation
			setCurrentValue(`${parseExpression(stringToCalc)}`);
		}
	};

	/**
	 * KeyBoard logic for calculator
	 * @param e - KeyBoard event
	 */
	const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		// Add operation
		if (e.key === "*") return addOperation("×");
		if (operations.includes(e.key)) return addOperation(e.key);

		// Add number
		if (keyboardKeys.includes(e.key)) return addNumber(e.key);

		// Add parenthesis
		if (e.key === "(" || e.key === ")") return addParenthesis(e.key);

		// Clear current value and current operation
		if (e.key === "Escape") return clear(e.key);

		// Calculate new value
		if (e.key === "Enter") return calculate(e.key);

		// Remove last char of current operation
		if (e.key === "Backspace") return setCurrentValue(currentValue.slice(0, -1));
	};

	/**
	 * Adds a number to the current value
	 */
	const addNumber = useCallback(
		(number: string) => {
			// If last char of operation is "=", then set operation and value to empty string
			if (currentOperation.at(-1) === "=") clear("C");

			// Check on max value length
			if (currentValue.length === 16) return;

			// Disable add "," to current value if current value is empty
			if (currentValue === "" && number === ",") return;

			// Disable add "," to current value if current value has ","
			if (currentValue.indexOf(",") !== -1 && number === ",") return;

			// Disable add any number to current value if current value is "0"
			if (currentValue === "0" && number !== ",") return;

			// Disable add some 0 to current value if current value is "0" or ""
			if ((currentValue === "" || currentValue === "0" || currentOperation.at(-1) === "=") && number === "00") return setCurrentValue("0");

			setCurrentValue((prevValue) => prevValue + number);
		},
		[currentOperation, currentValue],
	);

	/**
	 * Adds a operation char to the current operation
	 * @param operation
	 * @returns
	 */
	const addOperation = useCallback(
		(operation: string) => {
			// Logic for sqrt operator
			if (operation === "√" && currentOperation.at(-1) !== "√") {
				// Disable add "√" to current operation if current value is empty and last char of current operation not a number
				if (currentValue === "" && !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(currentOperation.at(-1)!)) return;

				// Add current value to current operation
				if (currentOperation.at(-1) === "=") setCurrentOperation(operation + currentValue);
				else setCurrentOperation((prevValue) => prevValue + operation + currentValue);

				// Clear current value
				return setCurrentValue("");
			}

			// If last char of current operation is a operator
			if (operations.includes(currentOperation.at(-1)!) && currentValue === "") {
				// If last char of current operation equal operation, then disable add operation
				if (currentOperation.at(-1)! === operation) return;

				// If last char of current operation equal "√", then disable add operation
				if (currentOperation.at(-1)! === "√") return;

				// Change last char of current operation on new operator
				return setCurrentOperation((prevValue) => prevValue.slice(0, -1) + operation);
			}

			// Disable add any operator when current value is empty and current operation is empty
			if (currentValue === "" && currentOperation === "" && operation !== "√") return;

			// Set new current operation with (without) prevValue and currentValue and operation
			if (currentOperation.at(-1) === "=") setCurrentOperation(currentValue + operation);
			else setCurrentOperation((prevValue) => prevValue + currentValue + operation);

			// Clear current value
			setCurrentValue("");
		},
		[currentOperation, currentValue],
	);

	/**
	 * Adds a parenthesis to the current operation
	 * @param parenthesis
	 * @returns
	 */
	const addParenthesis = (parenthesis: string) => {
		// Add a "(" parenthesis
		if (parenthesis === "(") {
			if (currentOperation === "" || operations.includes(currentOperation.at(-1)!)) {
				return setCurrentOperation((prevValue) => prevValue + parenthesis);
			}
		}

		// Add a ")" parenthesis
		if (parenthesis === ")") {
			const openParenthesisNumber = currentOperation.split("").filter((char) => char === "(").length;
			const closeParenthesisNumber = currentOperation.split("").filter((char) => char === ")").length;

			// Disable add parenthesis if last char of current operation a operator
			if (currentOperation === "") return;

			if (currentOperation.at(-1) === "(") return;

			// Add ")" if currentOperation and currentValue are not empty
			if (currentValue === "" && operations.includes(currentOperation.at(-1)!)) return;
			else if (openParenthesisNumber === closeParenthesisNumber) return;
			else {
				setCurrentOperation((prevValue) => prevValue + currentValue + parenthesis);

				// Clear current value
				return setCurrentValue("");
			}
		}
	};

	return (
		<div className="calc" ref={calcRef} tabIndex={0} onKeyDown={(e) => onKeyDown(e)} data-testid="calc">
			<Container>
				<TopPanel>
					<CurrentOperation value={currentOperation}></CurrentOperation>
					<CurrentValue value={currentValue}></CurrentValue>
				</TopPanel>
				<ButtonsPanel>
					<ButtonsBar>
						<Button label="C" fill={false} onClick={clear} />
						<Button label="√" fill={false} onClick={addOperation} />
						<Button label="%" fill={false} onClick={addOperation} />
						<Button label="/" fill={false} onClick={addOperation} />
					</ButtonsBar>
					<ButtonsBar>
						<Button label="7" fill={false} onClick={addNumber} />
						<Button label="8" fill={false} onClick={addNumber} />
						<Button label="9" fill={false} onClick={addNumber} />
						<Button label="×" fill={false} onClick={addOperation} />
					</ButtonsBar>
					<ButtonsBar>
						<Button label="4" fill={false} onClick={addNumber} />
						<Button label="5" fill={false} onClick={addNumber} />
						<Button label="6" fill={false} onClick={addNumber} />
						<Button label="-" fill={false} onClick={addOperation} />
					</ButtonsBar>
					<ButtonsBar>
						<Button label="1" fill={false} onClick={addNumber} />
						<Button label="2" fill={false} onClick={addNumber} />
						<Button label="3" fill={false} onClick={addNumber} />
						<Button label="+" fill={false} onClick={addOperation} />
					</ButtonsBar>
					<ButtonsBar>
						<Button label="00" fill={false} onClick={addNumber} />
						<Button label="0" fill={false} onClick={addNumber} />
						<Button label="," fill={false} onClick={addNumber} />
						<Button label="=" fill={true} onClick={calculate} />
					</ButtonsBar>
				</ButtonsPanel>
			</Container>
		</div>
	);
}
