# react-server-demo-remix-tutorial

[`@hiogawa/react-server`](https://github.com/hi-ogawa/vite-plugins/tree/main/packages/react-server)
adaptation of
[Remix Tutorial Demo](https://github.com/remix-run/remix/blob/b07921efd5e8eed98e2996749852777c71bc3e50/docs/start/tutorial.md)

- https://react-server-demo-remix-tutorial.hiro18181.workers.dev
- [Try it on Stackblitz](https://stackblitz.com/https://github.com/hi-ogawa/react-server-demo-remix-tutorial)

```sh
# development
pnpm i
pnpm dev

# build and preview
pnpm build
pnpm preview

# deploy cloudflare workers
pnpm i -D wrangler
pnpm cf-build
pnpm cf-preview
pnpm cf-release
```
