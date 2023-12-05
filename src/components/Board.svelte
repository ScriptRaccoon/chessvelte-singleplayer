<script lang="ts">
	import type { Board } from "@/ts/Board"
	import { COLS, ROWS, SIZE } from "@/ts/config"
	import Square from "./Square.svelte"
	import Piece from "./Piece.svelte"
	import { has_coord, key } from "@/ts/utils"
	import type { Coord } from "@/ts/types"

	export let move_counter = 0
	export let board: Board
	export let possible_moves: Coord[] | null = null
</script>

<div class="board">
	<div class="squares" style:--size={SIZE}>
		{#each ROWS as row}
			{#each COLS as col}
				<Square
					coord={[row, col]}
					light={(row + col) % 2 == 0}
					possible={has_coord(possible_moves, [row, col])}
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
