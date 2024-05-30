import React from "react";
import ReactDOMClient from "react-dom/client";
import type { FlightData } from "./entry-server";
import { createMemoImport } from "./runtime-client";

async function main() {
	// react client (flight -> react node)
	(globalThis as any).__webpack_require__ = createMemoImport();
	const { default: ReactClient } = await import(
		"react-server-dom-webpack/client.browser"
	);
	const initPromise = ReactClient.createFromReadableStream<FlightData>(
		(globalThis as any).__flightStreamScript,
	);

	let $__setState: (data: Promise<FlightData>) => void;

	function Root() {
		const [promise, setState] = React.useState(initPromise);
		$__setState = setState;

		return React.use(promise);
	}

	// react dom browser (react node -> html)
	React.startTransition(() => {
		ReactDOMClient.hydrateRoot(document, <Root />);
	});

	if (import.meta.hot) {
		import.meta.hot.on("rsc-update", () => {
			$__setState(ReactClient.createFromFetch<FlightData>(fetch("/?__flight")));
		});
	}
}

main();
