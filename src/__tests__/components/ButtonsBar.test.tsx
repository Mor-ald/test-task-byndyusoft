import { render } from "@testing-library/react";
import Button from "../../components/button/Button";

import "../../components/button/Button.style.css";
import { describe, expect, test } from "@jest/globals";
import { ButtonsBar } from "../../components/components";

describe("ButtonBar's tests", () => {
	test("ButtonBar has className equal buttons-bar", () => {
		const { getByTestId } = render(
			<ButtonsBar>
				<Button label="1" fill={false} onClick={() => {}} />
			</ButtonsBar>,
		);

		expect(getByTestId("buttons-bar").className).toBe("buttons-bar");
	});

	test("ButtonBar has button with label 'Test button'", () => {
		const { getByText } = render(
			<ButtonsBar>
				<Button label="Test button" fill={false} onClick={() => {}} />
			</ButtonsBar>,
		);

		expect(getByText("Test button").innerHTML).toBe("Test button");
	});
});
