<script lang="ts">
	import type { Piece } from "@/controllers/Piece"
	import { piece_src } from "@/utils/config"

	export let captured_pieces: Piece[] = []

	$: white_group = captured_pieces
		.filter((piece) => piece.color === "white")
		.sort((p, q) => p.value - q.value)

	$: black_group = captured_pieces
		.filter((piece) => piece.color === "black")
		.sort((p, q) => p.value - q.value)

	$: groups = [white_group, black_group]
</script>

<div class="captures">
	{#each groups as pieces}
		<div class="group">
			{#each pieces as piece (piece.id)}
				<svg class="capture">
					<use xlink:href={piece_src(piece.type, piece.color)} />
				</svg>
			{/each}
		</div>
	{/each}
</div>

<style>
	.captures {
		width: var(--width);
		margin-inline: auto;
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.capture {
		width: 1.4rem;
		height: 1.4rem;
		margin-right: -0.25rem;
	}

	.group:nth-child(1) {
		text-align: left;
	}

	.group:nth-child(2) {
		text-align: right;
	}
</style>
