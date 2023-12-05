import type { Piece, Coord } from "@/ts/types"
import { is_valid } from "../utils"
import { DIRECTION } from "../config"
import type { Board } from "../Board"
import type { MoveHistory } from "../MoveHistory"

export function pawn_moves(
	pawn: Piece,
	coord: Coord,
	board: Board,
	move_history: MoveHistory
): Coord[] {
	const [row, col] = coord
	const moves: Coord[] = []
	const direction: number = DIRECTION[pawn.color]
	const in_front: Coord = [row + direction, col]
	const in_front2: Coord = [row + 2 * direction, col]

	// move one step in front
	if (is_valid(in_front) && !board.has(in_front)) {
		moves.push(in_front)

		// move two steps in front
		if (!pawn.moved && is_valid(in_front2) && !board.has(in_front2)) {
			moves.push(in_front2)
		}
	}

	// capturing move
	for (const offset of [+1, -1]) {
		const move: Coord = [row + direction, col + offset]
		const captured_piece = board.get(move)
		if (captured_piece && captured_piece.color != pawn.color) {
			moves.push(move)
		}
	}

	// en passant
	const last_move = move_history.get_last()
	if (!last_move) return moves
	const { start, end, piece, type } = last_move
	const en_passant_applies =
		type == "regular" &&
		piece.type === "pawn" &&
		piece.color !== pawn.color &&
		Math.abs(end[0] - start[0]) == 2 &&
		end[0] == row &&
		Math.abs(end[1] - col) == 1
	if (en_passant_applies) {
		moves.push([row + direction, end[1]])
	}
	// TODO: capture with en passant

	return moves
}
