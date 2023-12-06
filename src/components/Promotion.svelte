<script lang="ts">
	import { current_color } from "@/ts/stores"
	import type { Piece } from "@/ts/types"

	export let promote: (_: Piece["type"]) => void

	const PROMOTION_PIECE_TYPES: Piece["type"][] = [
		"queen",
		"rook",
		"bishop",
		"knight",
	]

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
	.overlay {
		z-index: 10;
		position: absolute;
		inset: 0;
		background-color: #0006;
	}

	dialog {
		z-index: 20;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		width: min(25rem, 95vw);

		border: none;
		border-radius: 0.25rem;
		box-shadow: 0rem 0rem 2rem #0005;
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
