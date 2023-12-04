import { writable } from "svelte/store"
import type { Coord } from "@/ts/types"

export const move_start_coord = writable<Coord | null>(null)
