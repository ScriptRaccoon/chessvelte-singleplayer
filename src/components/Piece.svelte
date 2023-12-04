<script lang="ts">
	import type { Piece, Coord } from "@/ts/types"
	export let coord: Coord
	export let piece: Piece
</script>

<div class="piece {piece.color}" style:--x={coord[1]} style:--y={coord[0]}>
	{piece.type}
</div>

<style lang="scss">
	.piece {
		pointer-events: none;
		top: 0;
		left: 0;
		position: absolute;
		width: 10vmin;
		height: 10vmin;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translate(calc(var(--x) * 10vmin), calc(var(--y) * 10vmin));
		&.black {
			color: black;
		}
		&.white {
			color: white;
			text-shadow: 1px 1px black;
		}
		font-weight: bold;
		font-size: 1.25rem;
	}
</style>
