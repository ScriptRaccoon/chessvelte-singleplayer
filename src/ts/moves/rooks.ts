import { COLS, ROWS } from "@/ts/config"
import type { Board, Coord, Piece, Position } from "@/ts/types"
import { to_coord, to_position } from "@/ts/utils"

export function rook_moves(rook: Piece, coord: Coord, board: Board): Coord[] {
	const [row, col] = to_position(coord)

	// horizontal moves to the right
	const moves_to_right: Position[] = []
	for (let i = col + 1; i < COLS.length; i++) {
		const piece = board[to_coord([row, i])]
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
	const moves_to_left: Position[] = []
	for (let i = col - 1; i >= 0; i--) {
		const piece = board[to_coord([row, i])]
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
	const moves_to_bottom: Position[] = []
	for (let i = row + 1; i < ROWS.length; i++) {
		const piece = board[to_coord([i, col])]
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
	const moves_to_top: Position[] = []
	for (let i = row - 1; i >= 0; i--) {
		const piece = board[to_coord([i, col])]
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
	].map(to_coord)
}
