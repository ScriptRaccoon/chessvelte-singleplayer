<script lang="ts">
	import { current_color } from "@/ts/stores"
</script>

<section aria-label="status">
	Turn: {$current_color}
</section>

<style lang="scss">
	section {
		text-align: center;
		padding-block: 0.5rem;
	}
</style>
