import { render } from "@testing-library/react";
import Button from "../../components/button/Button";

import "../../components/button/Button.style.css";
import { describe, expect, test } from "@jest/globals";
import { ButtonsBar, ButtonsPanel } from "../../components/components";

describe("ButtonsPanel's tests", () => {
	test("ButtonsPanel has className equal buttons-panel", () => {
		const { getByTestId } = render(
			<ButtonsPanel>
				<ButtonsBar>
					<Button label="Test button" fill={false} onClick={() => {}} />
				</ButtonsBar>
			</ButtonsPanel>,
		);

		expect(getByTestId("buttons-panel").className).toBe("buttons-panel");
	});
});
