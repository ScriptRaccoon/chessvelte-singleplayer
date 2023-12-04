import { writable } from "svelte/store"
import { initial_board } from "@/ts/initial_board"
import type { Color, Position, Board, Coord } from "@/ts/types"

export const current_color = writable<Color>("white")
export const board = writable<Board>(JSON.parse(JSON.stringify(initial_board)))
export const move_start_coord = writable<Coord | null>(null)
