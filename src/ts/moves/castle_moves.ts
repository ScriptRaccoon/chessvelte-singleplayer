import type { Board } from "../Board"
import type { Coord, Move, Piece } from "../types"
import { COLS } from "../config"
import { inner_range } from "../utils"

export function castle_moves(king: Piece, coord: Coord, board: Board): Move[] {
	if (king.moved) return []

	const [row, col] = coord
	const moves: Move[] = []

	for (const rook_col of [0, COLS.length - 1]) {
		const rook = board.get([row, rook_col])
		if (!rook || rook.moved || rook.type !== "rook") continue
		const range = inner_range(rook_col, col)
		if (range.some((_col) => board.has([row, _col]))) continue

		// TODO: check for king attacks here

		const rook_move: Move = {
			start: [row, rook_col],
			end: [row, rook_col == 0 ? col - 1 : col + 1],
			piece: rook,
			type: "regular",
		}

		const king_move: Move = {
			start: coord,
			end: [row, rook_col == 0 ? col - 2 : col + 2],
			piece: king,
			type: "castle",
			associated_move: rook_move,
		}

		moves.push(king_move)
	}
	return moves
}
