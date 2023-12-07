<script lang="ts">
	import { current_color } from "@/utils/stores"
	import { PROMOTION_PIECE_TYPES } from "@/utils/config"

	import Piece from "./Piece.svelte"
	import Dialog from "./Dialog.svelte"

	export let promote: (_: Piece["type"]) => void
	export let during_promotion: boolean = false

	function choose(type: Piece["type"]) {
		promote(type)
	}
</script>

<Dialog open={during_promotion} with_close_button={false}>
	<div class="choices">
		{#each PROMOTION_PIECE_TYPES as type}
			{@const src = new URL(
				`../assets/${type}_${$current_color}.svg`,
				import.meta.url
			).href}
			<button on:click={() => choose(type)}>
				<img {src} alt={type} />
			</button>
		{/each}
	</div>
</Dialog>

<style>
	.choices {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		justify-content: center;
		padding: 0.25rem;
	}

	img {
		width: 100%;
		height: 100%;
	}
</style>
