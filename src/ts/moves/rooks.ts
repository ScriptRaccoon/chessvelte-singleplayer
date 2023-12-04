import { COLS, ROWS } from "@/ts/config"
import type { Coord, Piece } from "@/ts/types"
import type { Board } from "../Board"

export function rook_moves(rook: Piece, coord: Coord, board: Board): Coord[] {
	const [row, col] = coord

	// horizontal moves to the right
	const moves_to_right: Coord[] = []
	for (let i = col + 1; i < COLS.length; i++) {
		const piece = board.get([row, i])
		if (piece) {
			if (piece.color != rook.color) {
				moves_to_right.push([row, i])
			}
			break
		} else {
			moves_to_right.push([row, i])
		}
	}

	// horizontal moves to the left
	const moves_to_left: Coord[] = []
	for (let i = col - 1; i >= 0; i--) {
		const piece = board.get([row, i])
		if (piece) {
			if (piece.color != rook.color) {
				moves_to_left.push([row, i])
			}
			break
		} else {
			moves_to_left.push([row, i])
		}
	}

	// vertical moves to the bottom
	const moves_to_bottom: Coord[] = []
	for (let i = row + 1; i < ROWS.length; i++) {
		const piece = board.get([i, col])
		if (piece) {
			if (piece.color != rook.color) {
				moves_to_bottom.push([i, col])
			}
			break
		} else {
			moves_to_bottom.push([i, col])
		}
	}

	// vertical moves to the top
	const moves_to_top: Coord[] = []
	for (let i = row - 1; i >= 0; i--) {
		const piece = board.get([i, col])
		if (piece) {
			if (piece.color != rook.color) {
				moves_to_top.push([i, col])
			}
			break
		} else {
			moves_to_top.push([i, col])
		}
	}

	return [
		...moves_to_left,
		...moves_to_right,
		...moves_to_top,
		...moves_to_bottom,
	]
}
