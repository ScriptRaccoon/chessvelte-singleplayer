import type { Color, Coord, Coord_Key } from "@/ts/types"
import { ROWS, COLS } from "./config"

export function switch_color(_color: Color): Color {
	return _color === "white" ? "black" : "white"
}

export function is_valid(coord: Coord): boolean {
	const [row, col] = coord
	return row >= 0 && col >= 0 && row < ROWS.length && col < COLS.length
}

export function deep_copy<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj))
}

export function key(coord: Coord): Coord_Key {
	return String(coord[0]) + String(coord[1])
}

export function unkey(key: Coord_Key): Coord {
	return [Number(key[0]), Number(key[1])]
}
