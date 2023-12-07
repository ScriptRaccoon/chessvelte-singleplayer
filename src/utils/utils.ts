export function deep_copy<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj))
}

export function typed_keys<T extends {}>(obj: T): (keyof T)[] {
	return Object.keys(obj) as (keyof T)[]
}

export function inner_range(a: number, b: number): number[] {
	if (a > b) {
		return inner_range(b, a)
	}
	const range: number[] = []
	for (let i = a + 1; i < b; i++) {
		range.push(i)
	}
	return range
}
