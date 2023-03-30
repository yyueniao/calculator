<script lang="ts">
	import type { Operation, Operator } from "../types";
	import DisplayScreen from "./DisplayScreen.svelte";
	import KeypadButtons from "./KeypadButtons.svelte";

	export let addTransaction: (operation: Operation) => void;

	const getErrorMessage = (displayValue: string): string | null => {
		switch (displayValue) {
			case "Infinity":
				return "Cannot devide by zero";
			case "NaN":
				return "Result is undefined";
			default:
				return null;
		}
	};

	/**
	 * never be empty string.
	 */
	let displayValue: string = "0";

	/*
	 * Must obey rules:
	 * 1. If `operand1` is null, then `operator` should be null.
	 * 2. If `operator` is null, then `operand2` should be null.
	 */
	let operand1: number | null = null;
	let operator: Operator | null = null;
	let operand2: number | null = null;

	let lastKeystroke: "number" | "operator" | "equal" | "others" | null = null;
	let showRecord = false;

	$: errorMessage = getErrorMessage(displayValue);
	$: waitingForNewValue =
		displayValue === "0" ||
		lastKeystroke === "operator" ||
		lastKeystroke === "equal";
	$: record = showRecord
		? `${operand1 ?? ""} ${operator ?? ""} ${operand2 ?? ""} ${
				operand2 !== null || operator === null ? "=" : ""
		  }`
		: " ";

	function clear(): void {
		lastKeystroke = "others";
		displayValue = "0";
		showRecord = false;
		operand1 = null;
		operator = null;
		operand2 = null;
	}

	function backSpace(): void {
		lastKeystroke = "others";
		if (waitingForNewValue) {
			showRecord = false;
			return;
		}
		displayValue = displayValue.slice(0, displayValue.length - 1);
		if (displayValue === "") {
			displayValue = "0";
		}
	}

	function inputDigit(e: CustomEvent<number>): void {
		const value = e.detail;
		lastKeystroke = "number";
		if (waitingForNewValue) {
			displayValue = "";
		}
		displayValue += String(value);
	}

	function addDecimal(): void {
		if (waitingForNewValue) {
			displayValue = "0";
		}
		if (!displayValue.includes(".")) {
			displayValue += ".";
		}
	}

	function calculate(
		left: number,
		operator: Operator,
		right: number
	): number {
		console.log(`Calculating ${left} ${operator} ${right}`);
		addTransaction({
			operand1: left,
			operator,
			operand2: right,
		});
		switch (operator) {
			case "+":
				return left + right;
			case "-":
				return left - right;
			case "*":
				return left * right;
			case "/":
				return left / right;
		}
	}

	function handleClickEqual(): void {
		lastKeystroke = "equal";
		if (operand2) {
			operand1 = Number(displayValue);
			displayValue = calculate(operand1, operator, operand2).toString();
		} else if (operator) {
			operand2 = Number(displayValue);
			displayValue = calculate(operand1, operator, operand2).toString();
		} else {
			operand1 = Number(displayValue);
		}
		showRecord = true;
	}

	function operate(e: CustomEvent<Operator>): void {
		const newOperator = e.detail;
		lastKeystroke = "operator";
		if (operator === null) {
			operand1 = Number(displayValue);
		}
		// make sure the `displayValue` is ready to be used
		else if (operand2 === null && !waitingForNewValue) {
			operand2 = Number(displayValue);
			displayValue = calculate(operand1, operator, operand2).toString();
			operand1 = Number(displayValue);
			operand2 = null;
		} else if (operand2 !== null) {
			operand1 = Number(displayValue);
			operand2 = null;
		}
		operator = newOperator;
		showRecord = true;
	}
</script>

<div class="calculator">
	<DisplayScreen {record} {errorMessage} {displayValue} />
	<KeypadButtons
		disableOperation={errorMessage !== null}
		on:clear={clear}
		on:backspace={backSpace}
		on:clickOperator={operate}
		on:inputDigit={inputDigit}
		on:addDecimal={addDecimal}
		on:clickEqual={handleClickEqual}
	/>
</div>

<style>
	.calculator {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		width: 450px;
		height: 500px;
		background-color: rgb(209, 240, 252);
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
	}
</style>
