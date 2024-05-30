"use client";

import React from "react";

export function Counter() {
	const [count, setCount] = React.useState(0);
	return (
		<div>
			<button onClick={() => setCount((v) => v + 1)}>{count} Clicks</button>
		</div>
	);
}

export function Hydrated() {
	const hydrated = React.useSyncExternalStore(
		React.useCallback(() => () => {}, []),
		() => true,
		() => false,
	);
	return <div>hydrated: {Number(hydrated)}</div>;
}
