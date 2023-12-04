<script lang="ts">
	import Board from "@/components/Board.svelte"
	import Piece from "@/components/Piece.svelte"
	import { moves } from "@/ts/moves/moves"
	import { board, move_start_coord, current_color } from "@/ts/stores"
	import type { Coord } from "@/ts/types"
	import { switch_color } from "@/ts/utils"

	let possible_coords: Coord[] | null = null

	function handle_click(event: CustomEvent<Coord>) {
		const coord = event.detail
		if ($move_start_coord) {
			finish_move(coord)
		} else {
			start_move(coord)
		}
	}

	function start_move(coord: Coord) {
		const piece = $board[coord]
		const ok = piece && piece.color == $current_color
		if (ok) {
			$move_start_coord = coord
			possible_coords = moves(piece, coord, $board)
		}
	}

	function finish_move(coord: Coord) {
		if (!$move_start_coord) return
		if ($move_start_coord == coord) {
			$move_start_coord = null
			return
		}
		if (!possible_coords?.includes(coord)) {
			return
		}
		const piece = $board[$move_start_coord]!
		delete $board[$move_start_coord]
		$board[coord] = piece
		piece.moved = true
		$move_start_coord = null
		$current_color = switch_color($current_color)
		possible_coords = []
	}
</script>

<section aria-label="game">
	<div class="game">
		<Board on:click={handle_click} />
		{#key $board}
			{#each Object.entries($board) as [coord, piece]}
				{#if piece}
					<Piece {coord} {piece} />
				{/if}
			{/each}
		{/key}
	</div>
</section>

<style>
	.game {
		box-sizing: content-box;
		width: 80vmin;
		height: 80vmin;
		border: 0.4rem solid var(--border-color);
		position: relative;
	}

	section {
		display: flex;
		justify-content: center;
	}
</style>
