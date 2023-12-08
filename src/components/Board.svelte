<script lang="ts">
	import Piece from "./Piece.svelte"
	import Square from "./Square.svelte"

	import type { Board as BoardController } from "@/controllers/Board"
	import { COLS, ROWS, SIZE } from "@/utils/config"
	import { gen_coord, has_coord, key } from "@/utils/coordinates"
	import type { Coord } from "@/utils/types"

	export let move_counter = 0
	export let board: BoardController
	export let possible_targets: Coord[] | null = null
	export let move_start_coord: Coord | null = null

	const SHOW_COORDS = import.meta.env.VITE_SHOW_COORDS === "1"
</script>

<div class="board" style:--size={SIZE}>
	<div class="squares">
		{#each ROWS as row}
			{#each COLS as col}
				{@const coord = gen_coord(row, col)}
				<Square
					{coord}
					light={(row + col) % 2 == 0}
					highlighted={has_coord(possible_targets, coord)}
					{SHOW_COORDS}
					selected={move_start_coord != null &&
						key(coord) == key(move_start_coord)}
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
		--unit: calc(var(--width) / var(--size));
		box-sizing: content-box;
		width: var(--width);
		height: var(--width);
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
