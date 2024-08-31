import "./ButtonsPanel.style.css";

import { IButtonsPanel } from "./ButtonsPanel.types";

/**
 * ButtonsPanel component
 */
export default function ButtonsPanel({ children }: IButtonsPanel) {
	return (
		<div className="buttons-panel" data-testid="buttons-panel">
			{children}
		</div>
	);
}
