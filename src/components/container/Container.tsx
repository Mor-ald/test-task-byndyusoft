import "./Container.style.css";

import { IContainer } from "./Container.types";

/**
 * Container component
 */
export default function Container({ children }: IContainer) {
	return (
		<div className="container" data-testid="container">
			<div className="calc-container">{children}</div>
			<div className="calc-shadow" data-testid="calc-shadow"></div>
		</div>
	);
}
