import type { Coord_Key } from "@/utils/types"
import { Piece } from "@/controllers/Piece"
import { Bishop } from "@/pieces/Bishop"
import { King } from "@/pieces/King"
import { Knight } from "@/pieces/Knight"
import { Pawn } from "@/pieces/Pawn"
import { Queen } from "@/pieces/Queen"
import { Rook } from "@/pieces/Rook"

const black_pieces: Record<Coord_Key, Piece> = {
	"00": new Rook("black"),
	"07": new Rook("black"),
	"01": new Knight("black"),
	"06": new Knight("black"),
	"02": new Bishop("black"),
	"05": new Bishop("black"),
	"03": new Queen("black"),
	"04": new King("black"),
	"10": new Pawn("black"),
	"11": new Pawn("black"),
	"12": new Pawn("black"),
	"13": new Pawn("black"),
	"14": new Pawn("black"),
	"15": new Pawn("black"),
	"16": new Pawn("black"),
	"17": new Pawn("black"),
}

const white_pieces: Record<Coord_Key, Piece> = {
	"70": new Rook("white"),
	"77": new Rook("white"),
	"71": new Knight("white"),
	"76": new Knight("white"),
	"72": new Bishop("white"),
	"75": new Bishop("white"),
	"73": new Queen("white"),
	"74": new King("white"),
	"60": new Pawn("white"),
	"61": new Pawn("white"),
	"62": new Pawn("white"),
	"63": new Pawn("white"),
	"64": new Pawn("white"),
	"65": new Pawn("white"),
	"66": new Pawn("white"),
	"67": new Pawn("white"),
}

export const initial_pieces: Record<Coord_Key, Piece> = {
	...black_pieces,
	...white_pieces,
}
