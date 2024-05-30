import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import {
	type InlineConfig,
	type Manifest,
	type Plugin,
	build,
	createServer,
	defineConfig,
} from "vite";
import { $__global } from "./src/global";

export default defineConfig((_env) => ({
	appType: "custom",
	clearScreen: false,
	plugins: [
		react(),

		// run ssr entry as middleware
		{
			name: "react-server:ssr",
			configureServer(server) {
				$__global.ssrServer = server;
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
			async configurePreviewServer(server) {
				const mod = await import(path.resolve("dist/ssr/index.js"));
				return () => {
					server.middlewares.use(async (req, res, next) => {
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
				$__global.clientReferences = new Set();
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
			async buildStart() {
				$__global.clientReferences = new Set();
				console.log("<<< [1/3] SERVER BUILD >>>");
				await build(reactServerViteConfig);
				console.log("<<< [2/3] BROWSER BUILD >>>");
			},
			async closeBundle() {
				console.log("<<< [3/3] SSR BUILD >>>");
				await build({
					build: {
						ssr: true,
						outDir: "dist/ssr",
						rollupOptions: {
							input: {
								index: "/src/entry-ssr",
							},
						},
					},
				});
			},
		},
		// virtual modules to switch dev/build behavior
		createVirtualPlugin("client-references", () => {
			// build only
			const ids = [...$__global.clientReferences];
			return `export default { ${ids
				.map((id) => `"${id}": () => import("${id}"),\n`)
				.join("")} }`;
		}),
		createVirtualPlugin("entry-browser", () => {
			if ($__global.reactServer) {
				return `
					${(react as any).preambleCode.replace("__BASE__", "/")};
					import("/src/entry-browser");
				`;
			} else {
				return `
					import "/src/entry-browser";
				`;
			}
		}),
		createVirtualPlugin("ssr-assets", () => {
			let ssrAssets: any;
			if ($__global.reactServer) {
				// dev
				ssrAssets = {
					bootstrapModules: ["/@id/__x00__virtual:entry-browser"],
				};
			} else {
				// build
				const manifest: Manifest = JSON.parse(
					fs.readFileSync("dist/browser/.vite/manifest.json", "utf-8"),
				);
				ssrAssets = {
					bootstrapModules: ["/" + manifest["virtual:entry-browser"].file],
				};
			}
			return `export default ${JSON.stringify(ssrAssets)}`;
		}),
	],
	// browser build config
	build: {
		manifest: true,
		outDir: "dist/browser",
		rollupOptions: {
			input: {
				index: "virtual:entry-browser",
			},
		},
	},
	optimizeDeps: {
		include: [],
	},
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
	build: {
		ssr: true,
		outDir: "dist/server",
		rollupOptions: {
			input: {
				index: "/src/entry-server",
			},
		},
	},
	plugins: [
		{
			name: "rsc-client-reference",
			transform(code, id, _options) {
				// client reference transform
				// (in practice, it's critical to post-process `id` to match how Vite handles them on browser)
				$__global.clientReferences.delete(id);
				if (/^(("use client")|('use client'))/.test(code)) {
					$__global.clientReferences.add(id);
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
		{
			name: "rsc-update",
			handleHotUpdate(ctx) {
				if (
					ctx.modules.every(
						(m) => m.id && !$__global.clientReferences.has(m.id),
					)
				) {
					$__global.ssrServer.ws.send({
						type: "custom",
						event: "rsc-update",
					});
				}
			},
		},
	],
};

function createVirtualPlugin(name: string, load: Plugin["load"]) {
	name = "virtual:" + name;
	return {
		name: `virtual-${name}`,
		resolveId(source, _importer, _options) {
			return source === name ? "\0" + name : undefined;
		},
		load(id, options) {
			if (id === "\0" + name) {
				return (load as any)(id, options);
			}
		},
	} satisfies Plugin;
}
