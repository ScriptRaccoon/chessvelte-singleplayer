import type { Color, Coord, Move } from "@/utils/types"
import type { Board } from "@/controllers/Board"
import type { MoveHistory } from "@/controllers/MoveHistory"
import { DIRECTION, ROWS } from "@/utils/config"
import { is_valid } from "@/utils/coordinates"
import { Piece } from "@/controllers/Piece"

export class Pawn extends Piece {
	constructor(color: Color, moved: boolean = false) {
		super("pawn", color, moved)
	}

	copy(): Pawn {
		return new Pawn(this.color, this.moved)
	}

	get_moves(
		coord: Coord,
		board: Board,
		move_history: MoveHistory | null
	): Move[] {
		const [row, col] = coord
		const moves: Move[] = []
		const direction: number = DIRECTION[this.color]
		const in_front: Coord = [row + direction, col]
		const in_front2: Coord = [row + 2 * direction, col]
		const base_line = ROWS.at(direction === 1 ? -1 : 0)

		// move one step in front
		if (is_valid(in_front) && !board.has(in_front)) {
			moves.push({
				start: coord,
				end: in_front,
				piece: this,
				type: in_front[0] == base_line ? "promotion" : "regular",
			})

			// move two steps in front
			if (!this.moved && is_valid(in_front2) && !board.has(in_front2)) {
				moves.push({
					start: coord,
					end: in_front2,
					piece: this,
					type: "regular",
				})
			}
		}

		// capturing move
		for (const offset of [+1, -1]) {
			const target: Coord = [row + direction, col + offset]
			const captured_piece = board.get(target)
			if (captured_piece && captured_piece.color != this.color) {
				moves.push({
					start: coord,
					end: target,
					piece: this,
					type: target[0] == base_line ? "promotion" : "regular",
					capture_at: target,
				})
			}
		}

		// en passant
		const last_move = move_history?.get_last()
		if (!last_move) return moves

		const { start, end, piece, type } = last_move
		const en_passant_applies =
			type == "regular" &&
			piece.type === "pawn" &&
			piece.color !== this.color &&
			Math.abs(end[0] - start[0]) == 2 &&
			end[0] == row &&
			Math.abs(end[1] - col) == 1
		if (en_passant_applies) {
			moves.push({
				start: coord,
				end: [row + direction, end[1]],
				piece: this,
				type: "en passant",
				capture_at: end,
			})
		}

		return moves
	}
}
