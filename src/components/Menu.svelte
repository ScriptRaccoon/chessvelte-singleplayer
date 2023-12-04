<script lang="ts">
	import { initial_board } from "@/ts/initial_board"
	import { board, current_color } from "@/ts/stores"

	function restart_game() {
		$board = JSON.parse(JSON.stringify(initial_board))
		$current_color = "white"
	}
</script>

<menu>
	<button on:click={restart_game}>Restart</button>
</menu>

<style>
	menu {
		display: flex;
		justify-content: center;
		padding-block: 0.5rem;
	}
	button {
		background-color: #555;
		padding: 0.2rem 0.4rem;
	}
</style>
