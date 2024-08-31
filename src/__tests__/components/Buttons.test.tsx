import { fireEvent, render } from "@testing-library/react";
import Button from "../../components/button/Button";

import "../../components/button/Button.style.css";
import { describe, expect, jest, test } from "@jest/globals";

describe("Button's tests", () => {
	test("Button's container has className equal button-container", () => {
		const { getByTestId } = render(<Button label="1" fill={false} onClick={() => {}} />);

		expect(getByTestId("button-container").className).toBe("button-container");
	});

	test("Button with label equal 1 and not filled", () => {
		const { getByText } = render(<Button label="1" fill={false} onClick={() => {}} />);

		expect(getByText("1").innerHTML).toBe("1");
		expect(getByText("1").className).toBe("button");
	});

	test("Button with label equal 5 and filled", () => {
		const { getByText } = render(<Button label="5" fill={true} onClick={() => {}} />);

		expect(getByText("5").innerHTML).toBe("5");
		expect(getByText("5").className).toBe("button-fill");
	});

	test("Button calls onClick handler when clicked", () => {
		const onClick = jest.fn();
		const { getByText } = render(<Button label="Test Button" fill={false} onClick={onClick} />);

		fireEvent.click(getByText("Test Button"));
		fireEvent.click(getByText("Test Button"));

		expect(onClick).toHaveBeenCalledTimes(2);
	});
});
