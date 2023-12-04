import type { Board } from "../Board"
import { SIZE } from "../config"
import type { Coord, Piece } from "../types"
import { is_valid } from "../utils"

export function bishop_moves(
	bishop: Piece,
	coord: Coord,
	board: Board
): Coord[] {
	const [row, col] = coord
	const moves: Coord[] = []

	const directions = [
		[+1, +1],
		[+1, -1],
		[-1, +1],
		[-1, -1],
	]

	for (const direction of directions) {
		const [x, y] = direction
		for (let i = 1; i < SIZE; i++) {
			const move: Coord = [row + x * i, col + y * i]
			if (!is_valid(move)) break
			const piece = board.get(move)
			if (piece) {
				if (piece.color != bishop.color) {
					moves.push(move)
				}
				break
			} else {
				moves.push(move)
			}
		}
	}

	return moves
}
