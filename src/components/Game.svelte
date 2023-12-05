<script lang="ts">
	import type { Coord, Move } from "@/ts/types"
	import { board } from "@/ts/Board"
	import { moves } from "@/ts/moves/moves"
	import { move_start_coord, current_color } from "@/ts/stores"
	import { key } from "@/ts/utils"
	import { move_history } from "@/ts/MoveHistory"

	import Status from "./Status.svelte"
	import Menu from "./Menu.svelte"
	import Board from "./Board.svelte"

	let possible_moves: Move[] | null = null
	let move_counter = 0

	$: possible_targets = possible_moves?.map((move) => move.end) ?? null

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
		const ok = piece?.color === $current_color
		if (ok) {
			$move_start_coord = coord
			possible_moves = moves(piece, coord, board, move_history)
		}
	}

	function finish_move(coord: Coord): void {
		if (!$move_start_coord) return
		if ($move_start_coord.toString() == coord.toString()) {
			$move_start_coord = null
			possible_moves = null
			return
		}
		const move = possible_moves?.find((move) => key(move.end) == key(coord))
		if (!move) return

		move_history.push(move)
		const { piece, capture_at } = move

		if (capture_at) board.remove(capture_at)
		board.remove($move_start_coord)
		board.set(coord, piece)
		piece.moved = true

		switch_player()
	}

	function switch_player() {
		$move_start_coord = null
		possible_moves = null
		current_color.switch()
		move_counter += 1
	}

	function handle_restart() {
		board.reset()
		current_color.reset()
		$move_start_coord = null
		possible_moves = null
		move_counter = 0
	}
</script>

<Board
	{move_counter}
	{board}
	on:click={handle_board_click}
	{possible_targets}
/>
<Status />
<Menu on:restart={handle_restart} />
