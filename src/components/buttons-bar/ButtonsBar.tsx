import "./ButtonsBar.style.css";

import { IButtonsBar } from "./ButtonsBar.types";

/**
 * ButtonsBar component
 */
export default function ButtonsBar({ children }: IButtonsBar) {
	return (
		<div className="buttons-bar" data-testid="buttons-bar">
			{children}
		</div>
	);
}
