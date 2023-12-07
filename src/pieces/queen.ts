import type { Color, Coord, Move } from "@/utils/types"
import { Piece } from "../controllers/Piece"
import type { Board } from "@/controllers/Board"

export class Queen extends Piece {
	constructor(color: Color, moved: boolean = false) {
		super("queen", color, moved)
	}

	copy(): Queen {
		return new Queen(this.color, this.moved)
	}

	get_moves(coord: Coord, board: Board): Move[] {
		return this.directional_moves(
			[
				[+1, 0],
				[-1, 0],
				[0, +1],
				[0, -1],
				[+1, +1],
				[+1, -1],
				[-1, +1],
				[-1, -1],
			],
			coord,
			board
		)
	}
}
