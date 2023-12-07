<script lang="ts">
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()
</script>

<menu>
	<button class="button" on:click={() => dispatch("restart")}>Restart</button>
</menu>

<style>
	menu {
		display: flex;
		justify-content: center;
		padding-block: 0.5rem;
	}
</style>
