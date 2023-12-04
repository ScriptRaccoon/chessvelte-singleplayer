export type Coord = [number, number]

export type Coord_Key = string

export type Color = "black" | "white"

export type Piece_Type =
	| "pawn"
	| "rook"
	| "knight"
	| "bishop"
	| "queen"
	| "king"

export type Piece = {
	type: Piece_Type
	color: Color
	moved: boolean
}
