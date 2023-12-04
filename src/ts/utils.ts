import type { Color, Position, Coord } from "@/ts/types"
import { ROWS, COLS } from "./config"

export function to_position(coord: Coord): Position {
	const x = Number(coord[0])
	const y = Number(coord[1])
	return [x, y]
}

export function to_coord(pos: Position): Coord {
	return `${pos[0]}${pos[1]}`
}

export function switch_color(_color: Color): Color {
	return _color === "white" ? "black" : "white"
}

export function is_valid(pos: Position): boolean {
	return (
		pos[0] >= 0 &&
		pos[1] >= 0 &&
		pos[0] < ROWS.length &&
		pos[1] < COLS.length
	)
}
