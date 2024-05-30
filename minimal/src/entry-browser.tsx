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
	const node = await ReactClient.createFromReadableStream<FlightData>(
		(globalThis as any).__flightStreamScript,
	);

	// react dom browser (react node -> html)
	React.startTransition(() => {
		ReactDOMClient.hydrateRoot(document, node);
	});
}

main();
