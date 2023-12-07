<script lang="ts">
	import { current_color } from "@/utils/stores"
	import Piece from "./Piece.svelte"
	import { PROMOTION_PIECE_TYPES } from "@/utils/config"

	export let promote: (_: Piece["type"]) => void

	export let open: boolean

	function choose(type: Piece["type"]) {
		promote(type)
	}
</script>

{#if open}
	<div class="overlay"></div>
{/if}

<dialog {open}>
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
</dialog>

<style>
	dialog {
		width: min(25rem, 95vw);
	}

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
