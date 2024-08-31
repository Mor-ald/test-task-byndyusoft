import { render } from "@testing-library/react";

import { describe, expect, test } from "@jest/globals";
import { Container } from "../../components/components";

describe("Container's tests", () => {
	test("Container has className equal container", () => {
		const { getByTestId } = render(<Container>Text of container</Container>);

		expect(getByTestId("container").className).toBe("container");
	});

	test("Container has div with text", () => {
		const { getByText } = render(<Container>Text of container</Container>);

		expect(getByText("Text of container").innerHTML).toBe("Text of container");
		expect(getByText("Text of container").className).toBe("calc-container");
	});

	test("Container has div with className equal calc-shadow", () => {
		const { getByTestId } = render(<Container>Text of container</Container>);

		expect(getByTestId("calc-shadow").className).toBe("calc-shadow");
	});
});
