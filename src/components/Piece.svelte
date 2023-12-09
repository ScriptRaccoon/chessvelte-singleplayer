<script lang="ts">
	import type { Piece } from "@/controllers/Piece"
	import type { Coord } from "@/utils/types"

	export let coord: Coord
	export let piece: Piece
	export let flipped: boolean

	const image_src = `sprite.svg#${piece.type}_${piece.color}`
</script>

<svg class="piece" class:flipped style:--x={coord[1]} style:--y={coord[0]}>
	<use xlink:href={image_src} />
</svg>

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
		--angle: 0deg;
		transform: translate(
				calc(var(--x) * var(--unit)),
				calc(var(--y) * var(--unit))
			)
			rotate(var(--angle));
	}
	.piece.flipped {
		--angle: 180deg;
	}
</style>
