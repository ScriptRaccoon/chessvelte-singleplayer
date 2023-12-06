import type { Board } from "../Board"
import type { Coord, Move, Piece } from "../types"
import { SIZE } from "../config"
import { is_valid } from "../utils"

export function directional_moves(directions: [number, number][]) {
	return (piece: Piece, coord: Coord, board: Board): Move[] => {
		const [row, col] = coord
		const moves: Move[] = []

		for (const direction of directions) {
			const [x, y] = direction
			for (let i = 1; i < SIZE; i++) {
				const end: Coord = [row + x * i, col + y * i]
				if (!is_valid(end)) break
				const other_piece = board.get(end)
				if (other_piece) {
					if (other_piece.color != piece.color) {
						moves.push({
							start: coord,
							end,
							piece,
							type: "regular",
							capture_at: end,
						})
					}
					break
				} else {
					moves.push({
						start: coord,
						end,
						piece,
						type: "regular",
					})
				}
			}
		}
		return moves
	}
}
