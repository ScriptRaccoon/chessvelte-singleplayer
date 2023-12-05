<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { move_start_coord } from "@/ts/stores"
	import type { Coord } from "@/ts/types"

	export let coord: Coord
	export let light: boolean
	export let possible: boolean
	export let SHOW_COORDS: boolean

	const dispatch = createEventDispatcher<{ click: Coord }>()

	$: selected = coord == $move_start_coord
</script>

<button
	class:light
	class:dark={!light}
	on:click={() => dispatch("click", coord)}
	class:selected
	class:possible
>
	{#if SHOW_COORDS}
		<span class="coord">
			{coord}
		</span>
	{/if}
</button>

<style lang="scss">
	button {
		position: relative;
		&:focus-visible {
			outline: 0.1rem solid white;
			outline-offset: -0.1rem;
		}
	}

	.coord {
		position: absolute;
		left: 0%;
		top: 0%;
		font-size: 0.8rem;
		font-family: monospace;
		color: white;
	}

	.selected::before {
		content: "";
		position: absolute;
		inset: 0;
		background-color: var(--selected-color);
	}

	.light {
		background-color: var(--light-square-color);
	}

	.dark {
		background-color: var(--dark-square-color);
	}

	.possible::before {
		content: "";
		position: absolute;
		inset: 0;
		background-color: var(--highlight-color);
	}
</style>
