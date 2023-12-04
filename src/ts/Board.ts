import type { Coord, Piece, Coord_Key } from "./types"
import { initial_pieces } from "./initial_pieces"
import { deep_copy, key, unkey } from "./utils"

export class Board {
	private map: Record<Coord_Key, Piece | undefined>

	constructor() {
		this.map = deep_copy(initial_pieces)
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
		return Object.keys(this.map).map(unkey)
	}
}

export const board = new Board()
