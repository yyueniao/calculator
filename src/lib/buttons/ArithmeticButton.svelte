<script lang="ts">
	export let disabled: boolean = false;
</script>

<button {disabled} on:click><slot /></button>
