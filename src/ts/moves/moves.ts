import type { Board } from "../Board"
import { type Piece, type Coord } from "../types"
import { bishop_moves } from "./bishop"

import { pawn_moves } from "./pawns"
import { queen_moves } from "./queen"
import { rook_moves } from "./rooks"

export function moves(piece: Piece, coord: Coord, board: Board): Coord[] {
	switch (piece.type) {
		case "pawn":
			return pawn_moves(piece, coord, board)
		case "rook":
			return rook_moves(piece, coord, board)
		case "bishop":
			return bishop_moves(piece, coord, board)
		case "knight":
			return []
		case "queen":
			return queen_moves(piece, coord, board)
		case "king":
			return []
	}
}
