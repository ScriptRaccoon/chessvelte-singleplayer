import type { Piece } from "@/controllers/Piece"
import type { Color } from "./types"

export const ROWS = [0, 1, 2, 3, 4, 5, 6, 7]
export const COLS = [0, 1, 2, 3, 4, 5, 6, 7]
export const SIZE = 8

export const DIRECTION: Record<Color, number> = {
	black: +1,
	white: -1,
}

export const PROMOTION_PIECE_TYPES: Piece["type"][] = [
	"queen",
	"rook",
	"bishop",
	"knight",
]

export const piece_src = (type: Piece["type"], color: Piece["color"]) =>
	`sprite.svg#${type}_${color}`

export const VALUES: Record<Piece["type"], number> = {
	rook: 5,
	bishop: 3,
	knight: 3,
	pawn: 1,
	queen: 9,
	king: Number.POSITIVE_INFINITY,
}
