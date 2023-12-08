<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { current_color } from "@/utils/stores"

	import { PROMOTION_PIECE_TYPES } from "@/utils/config"
	import Dialog from "./Dialog.svelte"

	const dispatch = createEventDispatcher()
</script>

<Dialog open={true} with_close_button={false} w="25rem">
	<div class="choices">
		{#each PROMOTION_PIECE_TYPES as type}
			{@const src = `sprite.svg#${type}_${$current_color}`}
			<button on:click={() => dispatch("type", type)}>
				<svg>
					<use xlink:href={src} />
				</svg>
			</button>
		{/each}
	</div>
</Dialog>

<style>
	.choices {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}

	button {
		aspect-ratio: 1;
	}

	svg {
		width: 100%;
		height: 100%;
	}
</style>
