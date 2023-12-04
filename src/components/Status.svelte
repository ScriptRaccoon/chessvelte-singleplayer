<script lang="ts">
	import type { Color } from "@/ts/types"

	export let current_color: Color
</script>

<section aria-label="status">
	Turn: {current_color}
</section>

<style lang="scss">
	section {
		text-align: center;
		padding-block: 0.5rem;
	}
</style>
