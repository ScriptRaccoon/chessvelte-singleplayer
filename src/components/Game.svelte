<script lang="ts">
	import type { Coord, Coord_Key } from "@/ts/types"
	import Board from "@/components/Board.svelte"
	import Piece from "@/components/Piece.svelte"
	import { board } from "@/ts/Board"
	import { moves } from "@/ts/moves/moves"
	import { move_start_coord, current_color } from "@/ts/stores"
	import { key, switch_color } from "@/ts/utils"

	let possible_keys: Coord_Key[] | null = null
	let move_counter = 0

	function handle_board_click(event: CustomEvent<Coord>) {
		const coord = event.detail
		if ($move_start_coord) {
			finish_move(coord)
		} else {
			start_move(coord)
		}
	}

	function start_move(coord: Coord) {
		const piece = board.get(coord)
		const ok = piece && piece.color == $current_color
		if (ok) {
			$move_start_coord = coord
			possible_keys = moves(piece, coord, board).map(key)
		}
	}

	function finish_move(coord: Coord): void {
		if (!$move_start_coord) return
		if ($move_start_coord.toString() == coord.toString()) {
			$move_start_coord = null
			return
		}
		if (!possible_keys) return
		if (!possible_keys.includes(key(coord))) {
			return
		}
		const piece = board.get($move_start_coord)
		if (!piece) return
		board.remove($move_start_coord)
		board.set(coord, piece)
		piece.moved = true
		$move_start_coord = null
		$current_color = switch_color($current_color)
		possible_keys = null
		move_counter += 1
	}
</script>

<section aria-label="game">
	<div class="game">
		<Board on:click={handle_board_click} />
		{#key move_counter}
			{#each board.coords as coord}
				{@const piece = board.get(coord)}
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
