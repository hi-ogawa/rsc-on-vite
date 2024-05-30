import ReactServer from "react-server-dom-webpack/server.edge";

export function registerClientReference(id: string, name: string) {
	// use async module + meme import
	// so we don't have to deal with preloadModule cache for now
	return Object.defineProperties(
		{},
		{
			...Object.getOwnPropertyDescriptors(
				ReactServer.registerClientReference({}, id, name),
			),
			$$async: { value: true },
		},
	) as any;
}
