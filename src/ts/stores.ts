import { writable } from "svelte/store"
import type { Color, Coord } from "@/ts/types"

export const current_color = writable<Color>("white")
export const move_start_coord = writable<Coord | null>(null)
