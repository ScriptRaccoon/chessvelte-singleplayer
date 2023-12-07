import type { Board } from "@/controllers/Board"
import type { Move } from "@/utils/types"
import { key } from "@/utils/coordinates"
import { moves } from "./moves"

export function is_attacked(move: Move, board: Board): boolean {
	const board_copy = board.copy()
	board_copy.apply_move(move)
	for (const coord of board_copy.coords) {
		const piece = board_copy.get(coord)
		if (!piece || piece.color === move.piece.color) continue
		const attacks = moves(piece, coord, board_copy, null, {
			check_threats: false,
		})
		for (const attack of attacks) {
			if (key(attack.end) === key(move.end)) {
				return true
			}
		}
	}
	return false
}
