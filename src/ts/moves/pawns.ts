import type { Piece, Coord, Move } from "../types"
import type { Board } from "../Board"
import type { MoveHistory } from "../MoveHistory"
import { DIRECTION, ROWS } from "../config"
import { is_valid } from "../utils"

export function pawn_moves(
	pawn: Piece,
	coord: Coord,
	board: Board,
	move_history: MoveHistory | null
): Move[] {
	const [row, col] = coord
	const moves: Move[] = []
	const direction: number = DIRECTION[pawn.color]
	const in_front: Coord = [row + direction, col]
	const in_front2: Coord = [row + 2 * direction, col]
	const base_line = ROWS.at(direction === 1 ? -1 : 0)

	// move one step in front
	if (is_valid(in_front) && !board.has(in_front)) {
		moves.push({
			start: coord,
			end: in_front,
			piece: pawn,
			type: in_front[0] == base_line ? "promotion" : "regular",
		})

		// move two steps in front
		if (!pawn.moved && is_valid(in_front2) && !board.has(in_front2)) {
			moves.push({
				start: coord,
				end: in_front2,
				piece: pawn,
				type: "regular",
			})
		}
	}

	// capturing move
	for (const offset of [+1, -1]) {
		const target: Coord = [row + direction, col + offset]
		const captured_piece = board.get(target)
		if (captured_piece && captured_piece.color != pawn.color) {
			moves.push({
				start: coord,
				end: target,
				piece: pawn,
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
		piece.color !== pawn.color &&
		Math.abs(end[0] - start[0]) == 2 &&
		end[0] == row &&
		Math.abs(end[1] - col) == 1
	if (en_passant_applies) {
		moves.push({
			start: coord,
			end: [row + direction, end[1]],
			piece: pawn,
			type: "en passant",
			capture_at: end,
		})
	}

	return moves
}
