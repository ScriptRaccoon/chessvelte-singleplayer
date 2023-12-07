<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { fade } from "svelte/transition"

	export let open: boolean = false
	export let with_close_button: boolean = true

	const dispatch = createEventDispatcher()
</script>

{#if open}
	<div class="overlay" transition:fade={{ duration: 100 }} />
{/if}

<dialog {open}>
	<slot />
	{#if with_close_button}
		<menu>
			<button class="button" on:click={() => dispatch("close")}>
				Ok
			</button>
		</menu>
	{/if}
</dialog>

<style>
	dialog {
		width: min(20rem, 95vw);
		z-index: 20;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		padding: 1rem;
		background-color: white;
		color: #222;
		text-align: center;
		border: none;
		border-radius: 0.25rem;
		box-shadow: 0rem 0rem 2rem #0005;
	}

	.overlay {
		z-index: 10;
		position: absolute;
		inset: 0;
		background-color: #0006;
	}

	menu {
		margin-top: 1rem;
	}
</style>
