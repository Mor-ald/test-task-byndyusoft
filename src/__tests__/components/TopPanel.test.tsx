import { render } from "@testing-library/react";

import { describe, expect, test } from "@jest/globals";
import { TopPanel } from "../../components/components";

describe("TopPanel's tests", () => {
	test("TopPanel has className equal top-panel", () => {
		const { getByTestId } = render(<TopPanel>top</TopPanel>);

		expect(getByTestId("top-panel").className).toBe("top-panel");
	});

	test("Container has div with text", () => {
		const { getByText } = render(<TopPanel>top</TopPanel>);

		expect(getByText("top").innerHTML).toBe("top");
	});
});
