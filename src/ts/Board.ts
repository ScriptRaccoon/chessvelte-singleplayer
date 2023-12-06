import type { Coord, Piece, Coord_Key, Move } from "./types"
import { initial_pieces } from "./initial_pieces"
import { deep_copy, key, typed_keys, unkey } from "./utils"

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
		const { piece, capture_at } = move
		if (capture_at) this.remove(capture_at)
		this.remove(move.start)
		if (move.type === "promotion" && move.promotion_type) {
			const new_piece: Piece = {
				type: move.promotion_type,
				color: piece.color,
				moved: false,
			}
			this.set(move.end, new_piece)
		} else {
			this.set(move.end, piece)
		}
	}
}
