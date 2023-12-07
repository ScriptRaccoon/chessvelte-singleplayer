<script lang="ts">
	import type { Coord, Game_Status, Move } from "@/utils/types"
	import { move_start_coord, current_color } from "@/utils/stores"
	import { key } from "@/utils/coordinates"
	import { MoveHistory } from "@/controllers/MoveHistory"
	import { Board as BoardController } from "@/controllers/Board"
	import type { Piece } from "@/controllers/Piece"

	import Menu from "./Menu.svelte"
	import Alert from "./Alert.svelte"
	import { default as BoardComponent } from "./Board.svelte"
	import Promotion from "./Promotion.svelte"

	const board = new BoardController()
	const move_history = new MoveHistory()

	let possible_moves: Move[] | null = null
	let move_counter = 0
	let game_status: Game_Status = "playing"
	let alert_message: string | null = null
	let promotion_move: Move | null = null

	$: possible_targets = possible_moves?.map((move) => move.end) ?? null

	function handle_board_click(event: CustomEvent<Coord>): void {
		if (game_status === "checkmate" || game_status === "stalemate") return
		const coord = event.detail
		if ($move_start_coord) {
			generate_move(coord)
		} else {
			start_move(coord)
		}
	}

	function start_move(coord: Coord): void {
		const piece = board.get(coord)
		const ok = piece?.color === $current_color
		if (!ok) return
		$move_start_coord = coord
		possible_moves = piece.get_save_moves(coord, board, move_history)
	}

	function generate_move(coord: Coord): void {
		if (!$move_start_coord) return
		if (key($move_start_coord) == key(coord)) {
			$move_start_coord = null
			possible_moves = null
			return
		}
		const move = possible_moves?.find((move) => key(move.end) == key(coord))
		if (!move) return

		if (move.type === "promotion") {
			promotion_move = move
		} else {
			execute_move(move)
		}
	}

	function finish_promotion(e: CustomEvent<Piece["type"]>) {
		if (!promotion_move) return
		promotion_move.promotion_type = e.detail
		execute_move(promotion_move)
		promotion_move = null
	}

	function execute_move(move: Move): void {
		move_history.push(move)
		board.apply_move(move)
		switch_player()
		update_status()
	}

	async function update_status() {
		game_status = board.get_status($current_color, move_history)
		setTimeout(() => {
			if (game_status === "checkmate") {
				alert_message = `Checkmate against ${$current_color}!`
			} else if (game_status === "stalemate") {
				alert_message = "Stalemate! It's a draw."
			}
		}, 250)
	}

	function switch_player(): void {
		$move_start_coord = null
		possible_moves = null
		current_color.switch()
		move_counter += 1
	}

	function handle_restart(): void {
		board.reset()
		current_color.reset()
		move_history.clear()
		$move_start_coord = null
		possible_moves = null
		move_counter = 0
		game_status = "playing"
		alert_message = null
		promotion_move = null
	}
</script>

<BoardComponent
	{move_counter}
	{board}
	on:click={handle_board_click}
	{possible_targets}
/>

<Menu on:restart={handle_restart} />

{#if promotion_move != null}
	<Promotion on:type={finish_promotion} />
{/if}

<Alert bind:alert_message />
