<script lang="ts">
	import Piece from "./Piece.svelte"
	import Promotion from "./Promotion.svelte"
	import Square from "./Square.svelte"

	import type { Board } from "@/controllers/Board"
	import { COLS, ROWS, SIZE } from "@/utils/config"
	import { has_coord } from "@/utils/coordinates"
	import type { Coord } from "@/utils/types"

	export let move_counter = 0
	export let board: Board
	export let possible_targets: Coord[] | null = null
	export let during_promotion: boolean
	export let promote: (_: Piece["type"]) => void

	const SHOW_COORDS = import.meta.env.VITE_SHOW_COORDS === "1"
</script>

<div class="board">
	<div class="squares" style:--size={SIZE}>
		{#each ROWS as row}
			{#each COLS as col}
				<Square
					coord={[row, col]}
					light={(row + col) % 2 == 0}
					highlighted={has_coord(possible_targets, [row, col])}
					{SHOW_COORDS}
					on:click
				/>
			{/each}
		{/each}
	</div>
	{#key move_counter}
		{#each board.coords as coord}
			{@const piece = board.get(coord)}
			{#if piece}
				<Piece {coord} {piece} />
			{/if}
		{/each}
	{/key}

	<Promotion open={during_promotion} {promote} />
</div>

<style>
	.board {
		box-sizing: content-box;
		width: 80vmin;
		height: 80vmin;
		margin-inline: auto;
		border: 0.4rem solid var(--border-color);
		position: relative;
	}
	.squares {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
	}
</style>
