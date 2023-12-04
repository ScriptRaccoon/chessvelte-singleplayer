<script lang="ts">
	import Square from "@/components/Square.svelte"
	import { COLS, ROWS } from "@/ts/config"
</script>

<div class="board" style:--size={COLS.length}>
	{#each ROWS as row}
		{#each COLS as col}
			<Square coord={[row, col]} light={(row + col) % 2 == 0} on:click />
		{/each}
	{/each}
</div>

<style>
	.board {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
	}
</style>
