import type { Piece, Coord, Move } from "@/ts/types"
import { is_valid } from "../utils"
import type { Board } from "../Board"

export function knight_moves(piece: Piece, coord: Coord, board: Board): Move[] {
	const [row, col] = coord

	const targets: Coord[] = [
		[row + 1, col + 2],
		[row - 1, col + 2],
		[row + 2, col + 1],
		[row - 2, col + 1],
		[row + 1, col - 2],
		[row - 1, col - 2],
		[row + 2, col - 1],
		[row - 2, col - 1],
	]

	const moves: Move[] = []

	for (const target of targets) {
		if (!is_valid(target)) continue
		const other = board.get(target)
		if (!other) {
			moves.push({
				start: coord,
				end: target,
				piece,
				type: "regular",
				capture_at: null,
			})
		} else if (other.color != piece.color) {
			moves.push({
				start: coord,
				end: target,
				piece,
				type: "regular",
				capture_at: target,
			})
		}
	}

	return moves
}
