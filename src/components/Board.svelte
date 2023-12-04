<script lang="ts">
	import type { Board } from "@/ts/Board"
	import { COLS, ROWS, SIZE } from "@/ts/config"
	import Square from "./Square.svelte"
	import Piece from "./Piece.svelte"

	export let move_counter = 0
	export let board: Board
</script>

<div class="board">
	<div class="squares" style:--size={SIZE}>
		{#each ROWS as row}
			{#each COLS as col}
				<Square
					coord={[row, col]}
					light={(row + col) % 2 == 0}
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
