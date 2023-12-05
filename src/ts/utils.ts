import type { Coord, Coord_Key } from "./types"
import { ROWS, COLS } from "./config"

export function is_valid(coord: Coord): boolean {
	const [row, col] = coord
	return row >= 0 && col >= 0 && row < ROWS.length && col < COLS.length
}

export function deep_copy<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj))
}

export function key(coord: Coord): Coord_Key {
	return `${coord[0]}${coord[1]}`
}

export function unkey(key: Coord_Key): Coord {
	return [Number(key[0]), Number(key[1])]
}

export function has_coord(coords: Coord[] | null, coord: Coord): boolean {
	if (!coords) return false
	return coords.some((_coord) => key(_coord) == key(coord))
}

export function typed_keys<T extends {}>(obj: T): (keyof T)[] {
	return Object.keys(obj) as (keyof T)[]
}
