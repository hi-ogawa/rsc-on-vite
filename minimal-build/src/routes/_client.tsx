"use client";

import React from "react";

export function Counter() {
	const [count, setCount] = React.useState(0);
	return (
		<div>
			client{" "}
			<button onClick={() => setCount((v) => v + 1)}>{count} Clicks</button>
		</div>
	);
}
