<script lang="ts">
	import type { Piece } from "@/controllers/Piece"
	import type { Coord } from "@/utils/types"

	export let coord: Coord
	export let piece: Piece

	const image_src = new URL(
		`../assets/${piece.type}_${piece.color}.svg`,
		import.meta.url
	).href
</script>

<div>
	<img
		class="piece"
		style:--x={coord[1]}
		style:--y={coord[0]}
		src={image_src}
		alt="{piece.type} {piece.color}"
	/>
</div>

<style>
	.piece {
		pointer-events: none;
		top: 0;
		left: 0;
		position: absolute;
		width: var(--unit);
		height: var(--unit);
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translate(
			calc(var(--x) * var(--unit)),
			calc(var(--y) * var(--unit))
		);
	}
</style>
