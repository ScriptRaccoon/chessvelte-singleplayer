<script lang="ts">
	import type { Coord, Color, Move } from "@/ts/types"

	import { board } from "@/ts/Board"
	import { moves } from "@/ts/moves/moves"
	import { move_start_coord } from "@/ts/stores"
	import { deep_copy, has_coord, switch_color } from "@/ts/utils"
	import { move_history } from "@/ts/MoveHistory"

	import Status from "./Status.svelte"
	import Menu from "./Menu.svelte"
	import Board from "./Board.svelte"

	let possible_moves: Coord[] | null = null
	let move_counter = 0
	let current_color: Color = "white"

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
		const ok = piece && piece.color == current_color
		if (ok) {
			$move_start_coord = coord
			possible_moves = moves(piece, coord, board, history)
		}
	}

	function finish_move(coord: Coord): void {
		if (!$move_start_coord) return
		if ($move_start_coord.toString() == coord.toString()) {
			$move_start_coord = null
			possible_moves = null
			return
		}
		if (!has_coord(possible_moves, coord)) return
		const piece = board.get($move_start_coord)
		if (!piece) return

		const move: Move = {
			type: "regular",
			start: $move_start_coord,
			end: coord,
			piece: deep_copy(piece),
		}
		move_history.push(move)

		board.remove($move_start_coord)
		board.set(coord, piece)
		piece.moved = true
		$move_start_coord = null
		current_color = switch_color(current_color)
		possible_moves = null
		move_counter += 1
	}

	function handle_restart() {
		board.reset()
		current_color = "white"
		$move_start_coord = null
		possible_moves = null
		move_counter = 0
	}
</script>

<Board {move_counter} {board} on:click={handle_board_click} {possible_moves} />
<Status {current_color} />
<Menu on:restart={handle_restart} />
