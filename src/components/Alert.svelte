<script lang="ts">
	import Dialog from "./Dialog.svelte"

	export let alert_message: string | null

	function close() {
		alert_message = null
	}
</script>

<Dialog open={alert_message != null} on:close={close}>
	<p>
		{alert_message}
	</p>
</Dialog>

<style>
	p {
		font-size: 1.5rem;
	}
</style>
