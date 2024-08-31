import "./TopPanel.style.css";

import { ITopPanel } from "./TopPanel.types";

/**
 * TopPanel component
 */
export default function TopPanel({ children }: ITopPanel) {
	return (
		<div className="top-panel" data-testid="top-panel">
			{children}
		</div>
	);
}
