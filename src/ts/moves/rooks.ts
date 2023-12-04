import { COLS, ROWS } from "@/ts/config"
import type { Coord, Piece } from "@/ts/types"
import type { Board } from "../Board"

export function rook_moves(rook: Piece, coord: Coord, board: Board): Coord[] {
	const [row, col] = coord
	const moves: Coord[] = []

	// horizontal moves to the right
	for (let i = col + 1; i < COLS.length; i++) {
		const piece = board.get([row, i])
		if (piece) {
			if (piece.color != rook.color) {
				moves.push([row, i])
			}
			break
		} else {
			moves.push([row, i])
		}
	}

	// horizontal moves to the left
	for (let i = col - 1; i >= 0; i--) {
		const piece = board.get([row, i])
		if (piece) {
			if (piece.color != rook.color) {
				moves.push([row, i])
			}
			break
		} else {
			moves.push([row, i])
		}
	}

	// vertical moves to the bottom
	for (let i = row + 1; i < ROWS.length; i++) {
		const piece = board.get([i, col])
		if (piece) {
			if (piece.color != rook.color) {
				moves.push([i, col])
			}
			break
		} else {
			moves.push([i, col])
		}
	}

	// vertical moves to the top
	for (let i = row - 1; i >= 0; i--) {
		const piece = board.get([i, col])
		if (piece) {
			if (piece.color != rook.color) {
				moves.push([i, col])
			}
			break
		} else {
			moves.push([i, col])
		}
	}

	return moves
}
