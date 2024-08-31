import { render } from "@testing-library/react";

import { describe, expect, test } from "@jest/globals";
import { CurrentValue } from "../../components/components";

describe("CurrentValue's tests", () => {
	test("CurrentValue has className equal value-container", () => {
		const { getByTestId } = render(<CurrentValue value="1"></CurrentValue>);

		expect(getByTestId("value-container").className).toBe("value-container");
	});

	test("Container has div with text", () => {
		const { getByText } = render(<CurrentValue value="1"></CurrentValue>);

		expect(getByText("1").innerHTML).toBe("1");
	});

	test("Container has fontSize equal 56px", () => {
		const { getByText } = render(<CurrentValue value="1"></CurrentValue>);

		expect(getByText("1").style.fontSize).toBe("56px");
	});

	test("Container has fontSize equal 40px", () => {
		const { getByText } = render(<CurrentValue value="1234567890"></CurrentValue>);

		expect(getByText("1234567890").style.fontSize).toBe("40px");
	});

	test("Container has fontSize equal 30px", () => {
		const { getByText } = render(<CurrentValue value="123456789012345"></CurrentValue>);

		expect(getByText("123456789012345").style.fontSize).toBe("30px");
	});

	test("Container has fontSize equal 24px", () => {
		const { getByText } = render(<CurrentValue value="1234567890123456789"></CurrentValue>);

		expect(getByText("1234567890123456789").style.fontSize).toBe("24px");
	});
});
