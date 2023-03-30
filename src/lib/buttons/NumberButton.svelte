<script lang="ts">
	export let size: "large" | "normal" = "normal";
	export let disabled: boolean = false;
</script>

<button class={size} {disabled} on:click><slot /></button>
