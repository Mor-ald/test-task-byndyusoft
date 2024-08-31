import "./CurrentOperation.style.css";

import { ICurrentOperation } from "./CurrentOperation.types";

/**
 * CurrentOperation component
 */
export default function CurrentOperation({ value }: ICurrentOperation) {
	return (
		<div className="oper-container" data-testid="oper-container">
			{value}
		</div>
	);
}
