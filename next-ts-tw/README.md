# next-ts-tw

From [Next.js](https://github.com/vercel/next.js) to [`@hiogawa/react-server`](https://github.com/hi-ogawa/vite-plugins/tree/main/packages/react-server)

[Try it on Stackblitz](https://stackblitz.com/github/hi-ogawa/rsc-on-vite/tree/main/next-ts-tw?file=app%2Fpage.tsx)

```sh
# initially created with 15.0.0-canary.43
$ pnpm dlx create-next-app@canary
✔ What is your project named? … next-on-vite
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for next dev? … No / Yes
✔ Would you like to customize the import alias (@/* by default)? … No / Yes
```

```diff
diff --git a/next-ts-tw/package.json b/next-ts-tw/package.json
index c326ecd..0bdc812 100644
--- a/next-ts-tw/package.json
+++ b/next-ts-tw/package.json
@@ -2,6 +2,7 @@
   "name": "next-ts-tw",
   "version": "0.1.0",
   "private": true,
+  "type": "module",
   "scripts": {
     "dev": "next dev",
     "build": "next build",
@@ -9,15 +10,18 @@
     "lint": "next lint"
   },
   "dependencies": {
-    "react": "19.0.0-rc.0",
-    "react-dom": "19.0.0-rc.0",
-    "next": "15.0.0-canary.43"
+    "@hiogawa/react-server": "latest",
+    "next": "npm:@hiogawa/react-server-next@latest",
+    "react": "rc",
+    "react-dom": "rc",
+    "react-server-dom-webpack": "rc"
   },
   "devDependencies": {
     "typescript": "^5",
     "@types/node": "^20",
     "@types/react": "^18",
     "@types/react-dom": "^18",
+    "vite": "latest",
     "postcss": "^8",
     "tailwindcss": "^3.4.1"
   },
diff --git a/next-ts-tw/vite.config.ts b/next-ts-tw/vite.config.ts
new file mode 100644
index 0000000..59f9d79
--- /dev/null
+++ b/next-ts-tw/vite.config.ts
@@ -0,0 +1,6 @@
+import next from "next/vite";
+import { defineConfig } from "vite";
+
+export default defineConfig({
+  plugins: [next()],
+});
```
