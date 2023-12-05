import type { Piece, Coord, Move } from "@/ts/types"
import type { Board } from "../Board"
import { is_valid } from "../utils"
import { is_attacked } from "./attack"

export function king_moves(
	king: Piece,
	coord: Coord,
	board: Board,
	options: { check_threats: boolean }
): Move[] {
	const [row, col] = coord

	const moves: Move[] = []

	const directions = [
		[+1, 0],
		[-1, 0],
		[0, +1],
		[0, -1],
		[+1, +1],
		[+1, -1],
		[-1, +1],
		[-1, -1],
	]

	for (const direction of directions) {
		const [y, x] = direction

		const target: Coord = [row + y, col + x]
		if (!is_valid(target)) continue

		const piece = board.get(target)
		if (piece?.color === king.color) continue

		if (piece) {
			if (piece.color != king.color) {
				moves.push({
					start: coord,
					end: target,
					piece: king,
					type: "regular",
					capture_at: target,
				})
			}
		} else {
			moves.push({
				start: coord,
				end: target,
				piece: king,
				type: "regular",
				capture_at: null,
			})
		}
	}

	if (!options.check_threats) return moves

	return moves.filter((move) => !is_attacked(move, board))
}
