<script lang="ts">
	import Piece from "./Piece.svelte"
	import Square from "./Square.svelte"

	import type { Board } from "@/controllers/Board"
	import { COLS, ROWS, SIZE } from "@/utils/config"
	import { has_coord } from "@/utils/coordinates"
	import type { Coord } from "@/utils/types"

	export let move_counter = 0
	export let board: Board
	export let possible_targets: Coord[] | null = null

	const SHOW_COORDS = import.meta.env.VITE_SHOW_COORDS === "1"
</script>

<div class="board" style:--size={SIZE}>
	<div class="squares">
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
</div>

<style>
	.board {
		--dim: min(95vmin, 45rem);
		--unit: calc(var(--dim) / var(--size));
		box-sizing: content-box;
		width: var(--dim);
		height: var(--dim);
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
