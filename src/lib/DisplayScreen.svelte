<script lang="ts">
	export let record;
	export let errorMessage;
	export let displayValue;
</script>

<div class="display">
	<div class="record">{record}</div>
	{errorMessage === null ? displayValue : errorMessage}
</div>

<style>
	.display {
		width: 100%;
		height: 100px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
		gap: 5px;
		font-size: 36px;
		font-weight: bold;
		background-color: #fff;
		border-radius: 8px;
		padding: 16px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	}

	.record {
		font-size: 18px;
		font-weight: lighter;
		color: #797979;
	}
</style>
