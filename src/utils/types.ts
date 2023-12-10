import type { Piece } from "@/controllers/Piece"

export type Coord = [number, number]

export type Coord_Key = `${number}${number}`

export type Color = "black" | "white"

export type Move = {
	type: "regular" | "en passant" | "promotion" | "castle"
	start: Coord
	end: Coord
	piece: Piece
	capture?: Capture
	promotion_type?: Piece["type"]
	associated_move?: Move
}

export type Capture = {
	coord: Coord
	piece: Piece
}

export interface copyable<T> {
	copy: () => T
}

export type Callback = () => void
