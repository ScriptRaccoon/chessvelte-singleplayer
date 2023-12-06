export type Coord = [number, number]

export type Coord_Key = `${number}${number}`

export type Color = "black" | "white"

export type Piece = {
	type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king"
	color: Color
	moved: boolean
}

export type Move = {
	type: "regular" | "en passant" | "promotion" | "castle"
	start: Coord
	end: Coord
	piece: Piece
	capture_at: Coord | null
	promotion_type?: Piece["type"]
}
