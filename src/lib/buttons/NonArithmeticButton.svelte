<script lang="ts">
	export let size: "large" | "normal" = "normal";
	export let disabled: boolean = false;
</script>

<button class={size} {disabled} on:click><slot /></button>

<style>
	button {
		background-color: #333;
	}

	button:hover {
		background-color: #555;
	}

	button:disabled {
		background-color: #d6d6d6;
	}
</style>
