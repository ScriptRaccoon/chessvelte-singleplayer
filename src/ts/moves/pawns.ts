import type { Board, Piece, Position, Coord } from "@/ts/types"
import { is_valid, to_coord, to_position } from "../utils"
import { DIRECTION } from "../config"

export function pawn_moves(pawn: Piece, coord: Coord, board: Board): Coord[] {
	const [row, col] = to_position(coord)
	const moves: Coord[] = []
	const direction = DIRECTION[pawn.color]
	const in_front: Position = [row + direction, col]
	const in_front2: Position = [row + 2 * direction, col]

	// move one in front
	if (is_valid(in_front) && !board[to_coord(in_front)]) {
		moves.push(to_coord(in_front))

		// move two in front
		if (!pawn.moved && is_valid(in_front2) && !board[to_coord(in_front2)]) {
			moves.push(to_coord(in_front2))
		}
	}

	// capturing move
	for (const offset of [+1, -1]) {
		const move: Position = [row + direction, col + offset]
		const captured_piece = board[to_coord(move)]
		if (captured_piece && captured_piece.color != pawn.color) {
			moves.push(to_coord(move))
		}
	}

	return moves
}
