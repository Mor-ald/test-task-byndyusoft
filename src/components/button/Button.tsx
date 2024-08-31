import "./Button.css";

import { IButton } from "./Button.types";

/**
 * Button component
 */
export default function Button({ label, fill, onClick }: IButton) {
	return (
		<div className="button-container" onClick={() => onClick(label)} data-testid="button-container">
			<div className={fill ? "button-fill" : "button"}>{label}</div>
		</div>
	);
}
