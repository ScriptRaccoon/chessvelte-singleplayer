<script lang="ts">
	import type { Piece, Position, Coord } from "@/ts/types"
	import { to_position } from "@/ts/utils"
	export let coord: Coord
	export let piece: Piece
	const position: Position = to_position(coord)
</script>

<div
	class="piece {piece.color}"
	style:--x={position[1]}
	style:--y={position[0]}
>
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
