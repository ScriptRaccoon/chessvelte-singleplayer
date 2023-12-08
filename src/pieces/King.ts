import type { Color, Coord, Move } from "@/utils/types"
import type { Board } from "@/controllers/Board"
import type { MoveHistory } from "@/controllers/MoveHistory"
import { Piece } from "@/controllers/Piece"
import { is_valid } from "@/utils/coordinates"
import { COLS } from "@/utils/config"
import { inner_range } from "@/utils/utils"

export class King extends Piece {
	constructor(color: Color) {
		super("king", color)
	}

	copy(): King {
		return new King(this.color)
	}

	get_moves(
		coord: Coord,
		board: Board,
		move_history: MoveHistory | null,
		include_special_moves: boolean
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
			if (piece?.color === this.color) continue

			if (piece) {
				if (piece.color != this.color) {
					moves.push({
						start: coord,
						end: target,
						piece: this,
						type: "regular",
						capture_at: target,
					})
				}
			} else {
				moves.push({
					start: coord,
					end: target,
					piece: this,
					type: "regular",
				})
			}
		}

		if (include_special_moves) {
			moves.push(...this.castle_moves(coord, board, move_history))
		}

		return moves
	}

	castle_moves(
		coord: Coord,
		board: Board,
		move_history: MoveHistory | null
	): Move[] {
		if (move_history?.contains_piece(this)) return []
		if (board.is_check(this.color)) return []

		const [row, col] = coord
		const moves: Move[] = []

		for (const rook_col of [0, COLS.length - 1]) {
			const rook = board.get([row, rook_col])
			if (
				!rook ||
				rook.type !== "rook" ||
				move_history?.contains_piece(rook)
			)
				continue

			const range = inner_range(rook_col, col)
			if (range.some((_col) => board.has([row, _col]))) continue

			const jump_coord: Coord = [row, rook_col == 0 ? col - 1 : col + 1]
			const copy = board.copy()
			copy.remove(coord)
			copy.set(jump_coord, this)
			const jump_via_check = copy.is_check(this.color)
			if (jump_via_check) continue

			const rook_move: Move = {
				start: [row, rook_col],
				end: jump_coord,
				piece: rook,
				type: "regular",
			}

			const king_move: Move = {
				start: coord,
				end: [row, rook_col == 0 ? col - 2 : col + 2],
				piece: this,
				type: "castle",
				associated_move: rook_move,
			}

			moves.push(king_move)
		}
		return moves
	}
}
