import type { Move } from "./types"

export class MoveHistory {
	public moves: Move[] = []
	constructor() {
		this.moves = []
	}
	push(move: Move) {
		this.moves.push(move)
	}

	get_last(): Move | undefined {
		if (this.moves.length > 0) {
			return this.moves.at(-1)
		}
	}
}
