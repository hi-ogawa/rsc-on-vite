import path from 'node:path';
import { vitePluginReactServer } from '@hiogawa/react-server/plugin';
import {
  vitePluginLogger,
  vitePluginSsrMiddleware,
} from '@hiogawa/vite-plugin-ssr-middleware';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  clearScreen: false,
  plugins: [
    react(),
    vitePluginReactServer({
      prerender: async () => {
        process.env['IS_PRERENDER'] = '1';
        return ['/ssg/1', '/ssg/2'];
      },
    }),
    vitePluginLogger(),
    vitePluginSsrMiddleware({
      entry: process.env['SSR_ENTRY'] || '/src/adapters/node',
      preview: path.resolve('./dist/server/index.js'),
    }),
  ],
});
