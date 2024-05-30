export function createMemoImport() {
	const referenceMap = new Map<string, Promise<unknown>>();
	return (id: string) => {
		let mod = referenceMap.get(id);
		if (!mod) {
			mod = import(/* @vite-ignore */ id);
			referenceMap.set(id, mod);
		}
		return mod;
	};
}
