import type { Board } from "../Board"
import type { MoveHistory } from "../MoveHistory"
import { type Piece, type Coord } from "../types"
import { bishop_moves } from "./bishop"
import { knight_moves } from "./knight"

import { pawn_moves } from "./pawns"
import { queen_moves } from "./queen"
import { rook_moves } from "./rooks"

export function moves(
	piece: Piece,
	coord: Coord,
	board: Board,
	history: MoveHistory
): Coord[] {
	switch (piece.type) {
		case "pawn":
			return pawn_moves(piece, coord, board, history)
		case "rook":
			return rook_moves(piece, coord, board)
		case "bishop":
			return bishop_moves(piece, coord, board)
		case "knight":
			return knight_moves(piece, coord, board)
		case "queen":
			return queen_moves(piece, coord, board)
		case "king":
			return []
	}
}
