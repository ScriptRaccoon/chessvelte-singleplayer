import type { Coord, Piece, Coord_Key, Move, Color } from "@/utils/types"
import { initial_pieces } from "@/pieces/initial_pieces"
import { deep_copy, typed_keys } from "@/utils/utils"
import { key, unkey } from "@/utils/coordinates"
import { get_unsave_moves } from "@/pieces/moves"

type Map = Record<Coord_Key, Piece | undefined>

export class Board {
	private map: Map

	constructor(map: Map | undefined = undefined) {
		this.map = map ?? deep_copy(initial_pieces)
	}

	public copy(): Board {
		return new Board(deep_copy(this.map))
	}

	public get(coord: Coord): Piece | undefined {
		return this.map[key(coord)]
	}

	public has(coord: Coord): boolean {
		return key(coord) in this.map
	}

	public set(coord: Coord, piece: Piece): void {
		this.map[key(coord)] = piece
	}

	public remove(coord: Coord): void {
		delete this.map[key(coord)]
	}

	public reset(): void {
		this.map = deep_copy(initial_pieces)
	}

	public get coords(): Coord[] {
		return typed_keys(this.map).map(unkey)
	}

	public apply_move(move: Move): void {
		if (move.capture_at) this.remove(move.capture_at)
		this.remove(move.start)
		if (move.type === "promotion") {
			const new_piece: Piece = {
				type: move.promotion_type!,
				color: move.piece.color,
				moved: false,
			}
			this.set(move.end, new_piece)
		} else if (move.type === "castle") {
			this.set(move.end, move.piece)
			if (move.associated_move) this.apply_move(move.associated_move)
		} else {
			this.set(move.end, move.piece)
		}
	}

	public is_check(color: Color): boolean {
		const king_coord = this.coords.find((coord) => {
			const king = this.get(coord)
			return king && king.type === "king" && king.color === color
		})
		if (!king_coord) return false
		for (const coord of this.coords) {
			const piece = this.get(coord)
			if (!piece) continue
			const moves = get_unsave_moves(piece, coord, this, null)
			for (const move of moves) {
				const is_attacking =
					move.type === "regular" && key(move.end) === key(king_coord)
				if (is_attacking) return true
			}
		}
		return false
	}
}