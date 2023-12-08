<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import { PROMOTION_PIECE_TYPES } from "@/utils/config"
	import Dialog from "./Dialog.svelte"
	import type { Color } from "@/utils/types"

	export let color: Color

	const dispatch = createEventDispatcher()
</script>

<Dialog open={true} with_cancel_button={true} w="25rem" on:cancel>
	<div class="choices">
		{#each PROMOTION_PIECE_TYPES as type}
			{@const src = `sprite.svg#${type}_${color}`}
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
