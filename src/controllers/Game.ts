import type { Callback, Color, Coord, Move } from "@/utils/types"
import type { Piece } from "./Piece"
import { MoveHistory } from "./MoveHistory"
import { Board } from "./Board"
import { key } from "@/utils/coordinates"

export class Game {
	private move_history: MoveHistory = new MoveHistory()
	public board: Board = new Board()
	public current_color: Color = "white"
	public status: "playing" | "check" | "checkmate" | "stalemate" = "playing"
	public move_start_coord: Coord | null = null
	public possible_moves: Move[] | null = null
	public promotion_move: Move | null = null
	public rerender: boolean = true

	public get has_ended(): boolean {
		return this.status === "checkmate" || this.status === "stalemate"
	}

	public cancel_promotion(): void {
		this.promotion_move = null
		this.move_start_coord = null
		this.possible_moves = null
	}

	public select_coord(coord: Coord, callback: Callback): void {
		if (this.has_ended) return
		const piece = this.board.get(coord)
		if (this.move_start_coord) {
			if (key(this.move_start_coord) == key(coord)) {
				this.move_start_coord = null
				this.possible_moves = null
			} else if (piece?.color === this.current_color) {
				this.start_move(coord, piece)
			} else {
				this.generate_move(coord, callback)
			}
		} else if (piece?.color === this.current_color) {
			this.start_move(coord, piece)
		}
	}

	private start_move(coord: Coord, piece: Piece): void {
		this.move_start_coord = coord
		this.possible_moves = piece.get_save_moves(
			coord,
			this.board,
			this.move_history
		)
	}

	private generate_move(coord: Coord, callback: Callback): void {
		if (!this.move_start_coord) return
		const move = this.possible_moves?.find(
			(move) => key(move.end) == key(coord)
		)
		if (!move) return
		if (move.type === "promotion") {
			this.promotion_move = move
		} else {
			this.finish_move(move, callback)
		}
	}

	private execute_move(move: Move): void {
		this.move_history.push(move)
		this.board.apply_move(move)
	}

	private switch_color(): void {
		this.current_color = this.current_color === "white" ? "black" : "white"
		this.move_start_coord = null
		this.possible_moves = null
	}

	private update_status(): void {
		const moves = this.board.get_all_moves(
			this.current_color,
			this.move_history
		)
		const checked = this.board.is_check(this.current_color)
		if (moves.length === 0) {
			this.status = checked ? "checkmate" : "stalemate"
		} else {
			this.status = checked ? "check" : "playing"
		}
	}

	private finish_move(move: Move, callback: Callback): void {
		this.execute_move(move)
		this.switch_color()
		this.update_status()
		callback()
	}

	public finish_promotion(type: Piece["type"], callback: Callback): void {
		if (!this.promotion_move) return
		this.promotion_move.promotion_type = type
		this.finish_move(this.promotion_move, callback)
		this.promotion_move = null
	}

	public reset(): void {
		this.current_color = "white"
		this.status = "playing"
		this.move_start_coord = null
		this.possible_moves = null
		this.promotion_move = null
		this.move_history.clear()
		this.board.reset()
	}
}
