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
	public rerender: boolean = true
	private all_moves: Move[] = []
	public possible_moves: Move[] = []
	public move_start_coord: Coord | null = null
	public promotion_move: Move | null = null

	constructor() {
		this.compute_all_moves()
	}

	public get has_ended(): boolean {
		return this.status === "checkmate" || this.status === "stalemate"
	}

	public cancel_promotion(): void {
		this.promotion_move = null
		this.move_start_coord = null
		this.possible_moves = []
	}

	public select_coord(coord: Coord, callback?: Callback): void {
		if (this.has_ended) return
		const piece = this.board.get(coord)
		if (this.move_start_coord) {
			if (key(this.move_start_coord) == key(coord)) {
				this.cancel_move()
			} else if (piece?.color === this.current_color) {
				this.start_move(coord)
			} else {
				this.generate_move(coord, callback)
			}
		} else if (piece?.color === this.current_color) {
			this.start_move(coord)
		}
	}

	private cancel_move(): void {
		this.move_start_coord = null
		this.possible_moves = []
	}

	private start_move(coord: Coord): void {
		this.move_start_coord = coord
		this.possible_moves = this.all_moves.filter(
			(move) => key(move.start) === key(coord)
		)
	}

	private generate_move(coord: Coord, callback?: Callback): void {
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
		this.possible_moves = []
	}

	private update_status(): void {
		const checked = this.board.is_check(this.current_color)
		if (this.all_moves.length === 0) {
			this.status = checked ? "checkmate" : "stalemate"
		} else {
			this.status = checked ? "check" : "playing"
		}
	}

	private finish_move(move: Move, callback?: Callback): void {
		this.execute_move(move)
		this.switch_color()
		this.compute_all_moves()
		this.update_status()
		if (callback) callback()
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
		this.possible_moves = []
		this.promotion_move = null
		this.move_history.clear()
		this.board.reset()
		this.compute_all_moves()
	}

	compute_all_moves(): void {
		const moves: Move[] = []
		for (const coord of this.board.coords) {
			const piece = this.board.get(coord)
			if (!piece || piece.color !== this.current_color) continue
			moves.push(
				...piece.get_save_moves(coord, this.board, this.move_history)
			)
		}
		this.all_moves = moves
	}
}
