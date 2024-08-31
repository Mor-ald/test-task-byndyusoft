import { render } from "@testing-library/react";

import { describe, expect, test } from "@jest/globals";
import { CurrentOperation } from "../../components/components";

describe("CurrentOperation's tests", () => {
	test("CurrentOperation has className equal oper-container", () => {
		const { getByTestId } = render(<CurrentOperation value="+"></CurrentOperation>);

		expect(getByTestId("oper-container").className).toBe("oper-container");
	});

	test("Container has div with text", () => {
		const { getByText } = render(<CurrentOperation value="-"></CurrentOperation>);

		expect(getByText("-").innerHTML).toBe("-");
	});
});
