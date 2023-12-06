import type { Piece, Coord, Move } from "../types"
import type { Board } from "../Board"
import { is_valid } from "../utils"
import { is_attacked } from "./attack"
import { ROWS, COLS } from "../config"

export function king_moves(
	king: Piece,
	coord: Coord,
	board: Board,
	options: { check_threats: boolean }
): Move[] {
	const [row, col] = coord

	const moves: Move[] = []

	const directions = [
		[+1, 0],
		[-1, 0],
		[0, +1],
		[0, -1],
		[+1, +1],
		[+1, -1],
		[-1, +1],
		[-1, -1],
	]

	for (const direction of directions) {
		const [y, x] = direction

		const target: Coord = [row + y, col + x]
		if (!is_valid(target)) continue

		const piece = board.get(target)
		if (piece?.color === king.color) continue

		if (piece) {
			if (piece.color != king.color) {
				moves.push({
					start: coord,
					end: target,
					piece: king,
					type: "regular",
					capture_at: target,
				})
			}
		} else {
			moves.push({
				start: coord,
				end: target,
				piece: king,
				type: "regular",
			})
		}
	}

	// castling
	if (can_castle_king_side(coord, king, board)) {
		const rook_move: Move = {
			start: [coord[0], COLS.length - 1],
			end: [coord[0], coord[1] + 1],
			piece: board.get([coord[0], COLS.length - 1])!,
			type: "regular",
		}
		const king_move: Move = {
			start: coord,
			end: [coord[0], coord[1] + 2],
			piece: king,
			type: "castle",
			associated_move: rook_move,
		}
		moves.push(king_move)
	}

	if (!options.check_threats) return moves
	return moves.filter((move) => !is_attacked(move, board))
}

function can_castle_king_side(
	king_coord: Coord,
	king: Piece,
	board: Board
): boolean {
	if (king.moved) return false
	const rook_coord: Coord = [king_coord[0], COLS.length - 1]
	const rook = board.get(rook_coord)
	if (!rook || rook.moved || rook.type !== "rook") return false
	for (let col = king_coord[1] + 1; col < COLS.length - 1; col++) {
		if (board.has([king_coord[0], col])) return false
		// TODO: check threats to king on these positions
	}

	return true
}
