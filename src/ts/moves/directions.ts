import type { Board } from "../Board"
import type { Coord, Piece } from "../types"
import { SIZE } from "../config"
import { is_valid } from "../utils"

export function directional_moves(directions: [number, number][]) {
	return (piece: Piece, coord: Coord, board: Board): Coord[] => {
		const [row, col] = coord
		const moves: Coord[] = []

		for (const direction of directions) {
			const [x, y] = direction
			for (let i = 1; i < SIZE; i++) {
				const move: Coord = [row + x * i, col + y * i]
				if (!is_valid(move)) break
				const other_piece = board.get(move)
				if (other_piece) {
					if (other_piece.color != piece.color) {
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
}
