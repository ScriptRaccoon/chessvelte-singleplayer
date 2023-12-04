import type { Board, Piece, Coord } from "../types"
import { pawn_moves } from "./pawns"
import { rook_moves } from "./rooks"

export function moves(piece: Piece, coord: Coord, board: Board): Coord[] {
	switch (piece.type) {
		case "pawn":
			return pawn_moves(piece, coord, board)
		case "rook":
			return rook_moves(piece, coord, board)
		case "bishop":
			return []
		case "knight":
			return []
		case "queen":
			return []
		case "king":
			return []
	}
}
