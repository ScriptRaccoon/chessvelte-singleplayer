import type { Piece, Coord } from "@/ts/types"
import { is_valid } from "../utils"
import type { Board } from "../Board"

export function knight_moves(
	piece: Piece,
	coord: Coord,
	board: Board
): Coord[] {
	const [row, col] = coord

	const all_moves: Coord[] = [
		[row + 1, col + 2],
		[row - 1, col + 2],
		[row + 2, col + 1],
		[row - 2, col + 1],
		[row + 1, col - 2],
		[row - 1, col - 2],
		[row + 2, col - 1],
		[row - 2, col - 1],
	]

	const moves: Coord[] = all_moves.filter((_coord) => {
		return is_valid(_coord) && board.get(_coord)?.color != piece.color
	})

	return moves
}
