import type { Color, Coord, Move } from "@/utils/types"
import type { Board } from "@/controllers/Board"
import { Piece } from "@/controllers/Piece"

export class Bishop extends Piece {
	constructor(color: Color, moved: boolean = false) {
		super("bishop", color, moved)
	}

	copy(): Bishop {
		return new Bishop(this.color, this.moved)
	}

	get_moves(coord: Coord, board: Board): Move[] {
		return this.directional_moves(
			[
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
