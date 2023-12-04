<script lang="ts">
	import type { Coord, Coord_Key } from "@/ts/types"

	import { board } from "@/ts/Board"
	import { moves } from "@/ts/moves/moves"
	import { move_start_coord, current_color } from "@/ts/stores"
	import { key, switch_color } from "@/ts/utils"

	import Status from "./Status.svelte"
	import Menu from "./Menu.svelte"
	import Board from "./Board.svelte"

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

	function handle_restart() {
		board.reset()
		$current_color = "white"
		$move_start_coord = null
		possible_keys = null
		move_counter = 0
	}
</script>

<Board {move_counter} {board} on:click={handle_board_click} />
<Status />
<Menu on:restart={handle_restart} />
