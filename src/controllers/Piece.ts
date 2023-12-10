import type { MoveHistory } from "./MoveHistory"
import type { Board } from "@/controllers/Board"
import type { Color, Coord, Move } from "@/utils/types"
import { SIZE, VALUES } from "@/utils/config"
import { is_valid } from "@/utils/coordinates"
import { get_id } from "@/utils/utils"

export abstract class Piece {
	constructor(
		public type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king",
		public color: Color,
		public value: number = VALUES[type],
		public id: string = get_id()
	) {}

	abstract copy(): any

	abstract get_moves(
		coord: Coord,
		board: Board,
		move_history: MoveHistory | null,
		include_special_moves: boolean
	): Move[]

	get_save_moves(
		coord: Coord,
		board: Board,
		move_history: MoveHistory | null = null
	): Move[] {
		const moves = this.get_moves(coord, board, move_history, true)
		return moves.filter((move) => {
			const copy = board.copy()
			copy.apply_move(move)
			return !copy.is_check(this.color)
		})
	}

	directional_moves(
		directions: [number, number][],
		coord: Coord,
		board: Board
	): Move[] {
		const [row, col] = coord
		const moves: Move[] = []

		for (const direction of directions) {
			const [x, y] = direction
			for (let i = 1; i < SIZE; i++) {
				const end: Coord = [row + x * i, col + y * i]
				if (!is_valid(end)) break
				const other_piece = board.get(end)
				if (other_piece) {
					if (other_piece.color != this.color) {
						moves.push({
							start: coord,
							end,
							piece: this,
							type: "regular",
							capture: {
								coord: end,
								piece: other_piece,
							},
						})
					}
					break
				} else {
					moves.push({
						start: coord,
						end,
						piece: this,
						type: "regular",
					})
				}
			}
		}
		return moves
	}
}
