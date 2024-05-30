export function createMemoImport() {
	return memoize(importClientReference);
}

async function importClientReference(id: string) {
	if (import.meta.env.DEV) {
		return import(/* @vite-ignore */ id);
	} else {
		const mod = await import("virtual:client-references" as string);
		return mod.default[id]();
	}
}

function memoize<K, V>(f: (k: K) => V) {
	const cache = new Map<K, V>();
	return (k: K): V => {
		if (!cache.has(k)) {
			cache.set(k, f(k));
		}
		return cache.get(k)!;
	};
}
