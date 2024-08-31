import { useEffect, useState } from "react";
import "./CurrentValue.style.css";
import { ICurrentValue } from "./CurrentValue.types";

/**
 * CurrentValue component
 */
export default function CurrentValue({ value }: ICurrentValue) {
	const [fontSize, setFontSize] = useState("56px");

	useEffect(() => {
		if (value.length > 18) {
			setFontSize("24px");
		} else if (value.length > 14) {
			setFontSize("30px");
		} else if (value.length > 9) {
			setFontSize("40px");
		} else {
			setFontSize("56px");
		}
	}, [value.length]);

	return (
		<div className="value-container" style={{ fontSize: fontSize }} data-testid="value-container">
			{value}
		</div>
	);
}
