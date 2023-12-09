import type { Coord, Coord_Key } from "./types"
import { COLS, ROWS } from "./config"

export function is_valid(coord: Coord): boolean {
	const [row, col] = coord
	return row >= 0 && col >= 0 && row < ROWS.length && col < COLS.length
}

export function key(coord: Coord): Coord_Key {
	return `${coord[0]}${coord[1]}`
}

export function gen_coord(row: number, col: number): Coord {
	return [row, col]
}

export function unkey(key: Coord_Key): Coord {
	return [Number(key[0]), Number(key[1])]
}

export function has_coord(coords: Coord[], coord: Coord): boolean {
	return coords.some((_coord) => key(_coord) == key(coord))
}
