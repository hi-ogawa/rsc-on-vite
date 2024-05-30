import type { ViteDevServer } from "vite";

export const $__global: {
	reactServer: ViteDevServer;
	clientReferences: Set<string>;
} = ((globalThis as any).__VITE_REACT_SERVER_GLOBAL ??= {});
