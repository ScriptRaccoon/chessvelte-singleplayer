import type { copyable } from "./types"

export function deep_copy<S extends string | number, T extends copyable<T>>(
	obj: Record<S, T | undefined>
): Record<S, T | undefined> {
	const keys = typed_keys(obj)
	const copy = {} as Record<S, T | undefined>
	for (const key of keys) {
		copy[key] = obj[key] ? obj[key]?.copy() : undefined
	}
	return copy
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
