<script lang="ts">
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()
</script>

<menu>
	<button on:click={() => dispatch("restart")}>Restart</button>
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
