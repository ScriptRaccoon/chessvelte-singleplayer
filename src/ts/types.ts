export type Position = [number, number]

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

export type Coord = string
export type Board = Record<Coord, Piece | undefined>
