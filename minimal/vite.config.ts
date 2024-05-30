import { type InlineConfig, createServer, defineConfig } from "vite";
import { $__global } from "./src/global";

export default defineConfig((_env) => ({
	clearScreen: false,
	plugins: [
		// run ssr entry as middleware
		{
			name: "react-server:ssr",
			configureServer(server) {
				return () => {
					server.middlewares.use(async (req, res, next) => {
						const mod = await server.ssrLoadModule("/src/entry-ssr");
						try {
							await mod.default(req, res);
						} catch (e) {
							next(e);
						}
					});
				};
			},
		},
		// setup/teardown 2nd vite server from main vite server
		{
			name: "react-server:dev",
			apply: "serve",
			async buildStart() {
				$__global.reactServer = await createServer(reactServerViteConfig);
			},
			async buildEnd() {
				await $__global.reactServer?.close();
			},
		},
		// orchestrate three builds from a single browser build
		{
			name: "react-server:build",
			apply: (_config, env) => env.command === "build" && !env.isSsrBuild,
			async buildStart() {},
			async closeBundle() {},
		},
	],
}));

// vite config for 2nd vite server/build
const reactServerViteConfig: InlineConfig = {
	configFile: false,
	cacheDir: "node_modules/.vite-react-server",
	optimizeDeps: {
		noDiscovery: true,
	},
	ssr: {
		// bundle react-server runtime
		noExternal: true,
		resolve: {
			conditions: ["react-server"],
		},
		optimizeDeps: {
			include: [
				"react",
				"react/jsx-runtime",
				"react/jsx-dev-runtime",
				"react-server-dom-webpack/server.edge",
			],
		},
	},
	plugins: [
		{
			name: "client-reference",
			transform(code, id, _options) {
				// client reference transform
				if (/^(("use client")|('use client'))/.test(code)) {
					const matches = code.matchAll(/export function (\w+)\(/g);
					const result = [
						`import { registerClientReference as $$register } from "/src/runtime-server"`,
						...[...matches].map(([, name]) =>
							name === "default"
								? `export default $$register("${id}", "${name}")`
								: `export const ${name} = $$register("${id}", "${name}")`,
						),
					].join(";\n");
					return { code: result, map: null };
				}
			},
		},
	],
};
