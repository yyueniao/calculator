<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { Operator } from "../types";
	import ArithmeticButton from "./buttons/ArithmeticButton.svelte";
	import NonArithmeticButton from "./buttons/NonArithmeticButton.svelte";
	import NumberButton from "./buttons/NumberButton.svelte";

	const dispatch = createEventDispatcher();

	export let disableOperation: boolean;

	export let handleClear = () => {
		dispatch("clear");
	};
	export let handleBackSpace = () => {
		dispatch("backspace");
	};
	export let handleClickOperator = (operator: Operator) => {
		dispatch("clickOperator", operator);
	};
	export let handleInputDigit = (digit: number) => {
		dispatch("inputDigit", digit);
	};
	export let handleAddDecimal = () => {
		dispatch("addDecimal");
	};
	export let handleClickEqual = () => {
		dispatch("clickEqual");
	};
</script>

<div class="buttons">
	<NonArithmeticButton size="large" on:click={handleClear}
		>C</NonArithmeticButton
	>
	<NonArithmeticButton on:click={handleBackSpace} disabled={disableOperation}
		>&larr;</NonArithmeticButton
	>
	<ArithmeticButton
		on:click={() => handleClickOperator("/")}
		disabled={disableOperation}>÷</ArithmeticButton
	>
	<NumberButton
		on:click={() => handleInputDigit(7)}
		disabled={disableOperation}>7</NumberButton
	>
	<NumberButton
		on:click={() => handleInputDigit(8)}
		disabled={disableOperation}>8</NumberButton
	>
	<NumberButton
		on:click={() => handleInputDigit(9)}
		disabled={disableOperation}>9</NumberButton
	>
	<ArithmeticButton
		on:click={() => handleClickOperator("*")}
		disabled={disableOperation}>x</ArithmeticButton
	>
	<NumberButton
		on:click={() => handleInputDigit(4)}
		disabled={disableOperation}>4</NumberButton
	>
	<NumberButton
		on:click={() => handleInputDigit(5)}
		disabled={disableOperation}>5</NumberButton
	>
	<NumberButton
		on:click={() => handleInputDigit(6)}
		disabled={disableOperation}>6</NumberButton
	>
	<ArithmeticButton
		on:click={() => handleClickOperator("-")}
		disabled={disableOperation}>-</ArithmeticButton
	>
	<NumberButton
		on:click={() => handleInputDigit(1)}
		disabled={disableOperation}>1</NumberButton
	>
	<NumberButton
		on:click={() => handleInputDigit(2)}
		disabled={disableOperation}>2</NumberButton
	>
	<NumberButton
		on:click={() => handleInputDigit(3)}
		disabled={disableOperation}>3</NumberButton
	>
	<ArithmeticButton
		on:click={() => handleClickOperator("+")}
		disabled={disableOperation}>+</ArithmeticButton
	>
	<NumberButton
		size="large"
		on:click={() => handleInputDigit(0)}
		disabled={disableOperation}>0</NumberButton
	>
	<NumberButton on:click={handleAddDecimal} disabled={disableOperation}
		>.</NumberButton
	>
	<ArithmeticButton on:click={handleClickEqual} disabled={disableOperation}
		>=</ArithmeticButton
	>
</div>

<style>
	.buttons {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(5, 1fr);
		grid-gap: 8px;
		height: 300px;
		width: 100%;
	}
</style>
