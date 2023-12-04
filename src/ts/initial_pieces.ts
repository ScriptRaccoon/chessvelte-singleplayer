import type { Piece, Coord_Key } from "./types"

const black_pieces: Record<Coord_Key, Piece> = {
	"00": {
		type: "rook",
		color: "black",
		moved: false,
	},
	"07": {
		type: "rook",
		color: "black",
		moved: false,
	},
	"01": {
		type: "knight",
		color: "black",
		moved: false,
	},
	"06": {
		type: "knight",
		color: "black",
		moved: false,
	},
	"02": {
		type: "bishop",
		color: "black",
		moved: false,
	},
	"05": {
		type: "bishop",
		color: "black",
		moved: false,
	},
	"03": {
		type: "queen",
		color: "black",
		moved: false,
	},
	"04": {
		type: "king",
		color: "black",
		moved: false,
	},
	"10": {
		type: "pawn",
		color: "black",
		moved: false,
	},
	"11": {
		type: "pawn",
		color: "black",
		moved: false,
	},
	"12": {
		type: "pawn",
		color: "black",
		moved: false,
	},
	"13": {
		type: "pawn",
		color: "black",
		moved: false,
	},
	"14": {
		type: "pawn",
		color: "black",
		moved: false,
	},
	"15": {
		type: "pawn",
		color: "black",
		moved: false,
	},
	"16": {
		type: "pawn",
		color: "black",
		moved: false,
	},
	"17": {
		type: "pawn",
		color: "black",
		moved: false,
	},
}
const white_pieces: Record<Coord_Key, Piece> = {
	"70": {
		type: "rook",
		color: "white",
		moved: false,
	},
	"77": {
		type: "rook",
		color: "white",
		moved: false,
	},
	"71": {
		type: "knight",
		color: "white",
		moved: false,
	},
	"76": {
		type: "knight",
		color: "white",
		moved: false,
	},
	"72": {
		type: "bishop",
		color: "white",
		moved: false,
	},
	"75": {
		type: "bishop",
		color: "white",
		moved: false,
	},
	"73": {
		type: "queen",
		color: "white",
		moved: false,
	},
	"74": {
		type: "king",
		color: "white",
		moved: false,
	},
	"60": {
		type: "pawn",
		color: "white",
		moved: false,
	},
	"61": {
		type: "pawn",
		color: "white",
		moved: false,
	},
	"62": {
		type: "pawn",
		color: "white",
		moved: false,
	},
	"63": {
		type: "pawn",
		color: "white",
		moved: false,
	},
	"64": {
		type: "pawn",
		color: "white",
		moved: false,
	},
	"65": {
		type: "pawn",
		color: "white",
		moved: false,
	},
	"66": {
		type: "pawn",
		color: "white",
		moved: false,
	},
	"67": {
		type: "pawn",
		color: "white",
		moved: false,
	},
}

export const initial_pieces: Record<Coord_Key, Piece> = {
	...black_pieces,
	...white_pieces,
}
