import type { Coord, Move, Color } from "@/utils/types"
import type { Board } from "@/controllers/Board"
import { is_valid } from "@/utils/coordinates"
import { Piece } from "@/controllers/Piece"

export class Knight extends Piece {
	constructor(color: Color, moved: boolean = false) {
		super("knight", color, moved)
	}

	copy(): Knight {
		return new Knight(this.color, this.moved)
	}

	get_moves(coord: Coord, board: Board): Move[] {
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
					piece: this,
					type: "regular",
				})
			} else if (other.color != this.color) {
				moves.push({
					start: coord,
					end: target,
					piece: this,
					type: "regular",
					capture_at: target,
				})
			}
		}

		return moves
	}
}
