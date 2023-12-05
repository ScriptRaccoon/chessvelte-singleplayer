import type { Piece, Coord, Move } from "@/ts/types"
import { is_valid } from "../utils"
import type { Board } from "../Board"

export function king_moves(piece: Piece, coord: Coord, board: Board): Move[] {
	const [row, col] = coord

	const moves: Move[] = []

	return moves
}
