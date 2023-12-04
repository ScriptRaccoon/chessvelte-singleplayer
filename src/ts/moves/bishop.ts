import type { Coord, Piece } from "../types"
import type { Board } from "../Board"
import { directional_moves } from "./directions"

export function bishop_moves(
	piece: Piece,
	coord: Coord,
	board: Board
): Coord[] {
	return directional_moves(piece, coord, board, [
		[+1, +1],
		[+1, -1],
		[-1, +1],
		[-1, -1],
	])
}
