import ReactServer from "react-server-dom-webpack/server.edge";
import Page from "./routes/page";

export type StreamData = React.ReactNode;

export async function handler() {
	const node = <Page />;
	const stream = ReactServer.renderToReadableStream<StreamData>(
		node,
		createBundlerConfig(),
	);
	return stream;
}

function createBundlerConfig() {
	return new Proxy(
		{},
		{
			get(_target, p: string, _receiver) {
				const [id, name] = p.split("#");
				return { id, name, chunks: [] };
			},
		},
	);
}
