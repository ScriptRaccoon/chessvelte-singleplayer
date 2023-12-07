<script lang="ts">
	import { current_color } from "@/utils/stores"
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()
</script>

<div class="wrapper">
	<div aria-label="Turn: {$current_color}">
		<div class="circle {$current_color}"></div>
	</div>

	<menu>
		<!-- <button class="button">Back</button> -->
		<button class="button" on:click={() => dispatch("restart")}>
			Restart
		</button>
	</menu>
</div>

<style>
	.wrapper {
		width: var(--width);
		margin-inline: auto;
		display: flex;
		justify-content: space-between;
		margin-top: 0.75rem;
	}

	.circle {
		width: 1.5rem;
		aspect-ratio: 1;
		border-radius: 50%;
	}

	.circle.white {
		background-color: white;
	}

	.circle.black {
		background-color: black;
	}

	menu {
		display: flex;
		gap: 0.5rem;
	}
</style>
