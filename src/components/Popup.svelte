<script lang="ts">
	export let popup_message: string | null

	function close() {
		popup_message = null
	}
</script>

{#if popup_message}
	<div class="overlay" />
{/if}

<dialog open={Boolean(popup_message)}>
	<p>
		{popup_message}
	</p>
	<menu>
		<button class="button" on:click={close}>Ok</button>
	</menu>
</dialog>

<style>
	dialog {
		text-align: center;
		padding: 1rem;
		width: min(20rem, 95vw);
	}

	dialog > p {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
</style>
