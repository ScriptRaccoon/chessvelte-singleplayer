import { writable } from "svelte/store"
import type { Coord, Color } from "@/ts/types"

export const move_start_coord = writable<Coord | null>(null)

export const current_color = (() => {
	const color_store = writable<Color>("white")
	return {
		...color_store,
		switch() {
			color_store.update((col) => (col === "white" ? "black" : "white"))
		},
		reset() {
			color_store.set("white")
		},
	}
})()
