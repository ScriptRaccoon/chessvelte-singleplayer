import type { Color } from "./types"

export const ROWS = [0, 1, 2, 3, 4, 5, 6, 7]
export const COLS = [0, 1, 2, 3, 4, 5, 6, 7]

export const DIRECTION: Record<Color, number> = {
	black: +1,
	white: -1,
}
