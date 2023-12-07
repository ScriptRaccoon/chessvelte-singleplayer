import type { Board } from "@/controllers/Board"
import type { MoveHistory } from "@/controllers/MoveHistory"
import { type Piece, type Coord, type Move } from "@/utils/types"

import { bishop_moves } from "./bishop"
import { king_moves } from "./king"
import { knight_moves } from "./knight"
import { pawn_moves } from "./pawns"
import { queen_moves } from "./queen"
import { rook_moves } from "./rooks"

export function moves(
	piece: Piece,
	coord: Coord,
	board: Board,
	move_history: MoveHistory | null = null,
	options: { check_threats: boolean } = { check_threats: true }
): Move[] {
	switch (piece.type) {
		case "pawn":
			return pawn_moves(piece, coord, board, move_history)
		case "rook":
			return rook_moves(piece, coord, board)
		case "bishop":
			return bishop_moves(piece, coord, board)
		case "knight":
			return knight_moves(piece, coord, board)
		case "queen":
			return queen_moves(piece, coord, board)
		case "king":
			return king_moves(piece, coord, board, options)
	}
	return []
}
