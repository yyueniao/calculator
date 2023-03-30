<script lang="ts">
	export let disabled: boolean = false;
</script>

<button {disabled} on:click><slot /></button>

<style>
	button {
		background-color: #3d3dc6;
	}

	button:hover {
		background-color: #6b6bcb;
	}

	button:disabled {
		background-color: #d6d6d6;
	}
</style>
