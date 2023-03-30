<script lang="ts">
	import type { Operation, Operator } from "../types";

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

	$: errorMessage = getErrorMessage(displayValue);
	$: waitingForNewValue =
		displayValue === "0" ||
		lastKeystroke === "operator" ||
		lastKeystroke === "equal";

	function clear(): void {
		lastKeystroke = "others";
		displayValue = "0";
		operand1 = null;
		operator = null;
		operand2 = null;
	}

	function backSpace(): void {
		lastKeystroke = "others";
		if (waitingForNewValue) {
			return;
		}
		displayValue = displayValue.slice(0, displayValue.length - 1);
		if (displayValue === "") {
			displayValue = "0";
		}
	}

	function inputDigit(value: number): void {
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

	function calculate(left: number, operator: Operator, right: number): void {
		console.log(`Calculating ${left} ${operator} ${right}`);
		addTransaction({
			operand1: left,
			operator,
			operand2: right,
		});
		switch (operator) {
			case "+":
				displayValue = String(left + right);
				break;
			case "-":
				displayValue = String(left - right);
				break;
			case "*":
				displayValue = String(left * right);
				break;
			case "/":
				displayValue = String(left / right);
				break;
		}
		operator = null;
	}

	function handleClickEqual(): void {
		lastKeystroke = "equal";
		if (operand2) {
			operand1 = Number(displayValue);
			calculate(operand1, operator, operand2);
		} else if (operator) {
			operand2 = Number(displayValue);
			calculate(operand1, operator, operand2);
		} else {
			operand1 = Number(displayValue);
		}
	}

	function operate(newOperator: Operator): void {
		lastKeystroke = "operator";
		if (operator && operand1) {
			calculate(operand1, operator, operand2);
		}
		operator = newOperator;
		operand1 = Number(displayValue);
	}
</script>

<div class="calculator">
	<div class="display">
		{errorMessage === null ? displayValue : errorMessage}
	</div>
	<div class="buttons">
		<button class="large" on:click={clear}>C</button>
		<button on:click={backSpace}>&larr;</button>
		<button class="operator" on:click={() => operate("/")}>÷</button>
		<button on:click={() => inputDigit(7)}>7</button>
		<button on:click={() => inputDigit(8)}>8</button>
		<button on:click={() => inputDigit(9)}>9</button>
		<button class="operator" on:click={() => operate("*")}>x</button>
		<button on:click={() => inputDigit(4)}>4</button>
		<button on:click={() => inputDigit(5)}>5</button>
		<button on:click={() => inputDigit(6)}>6</button>
		<button class="operator" on:click={() => operate("-")}>-</button>
		<button on:click={() => inputDigit(1)}>1</button>
		<button on:click={() => inputDigit(2)}>2</button>
		<button on:click={() => inputDigit(3)}>3</button>
		<button class="operator" on:click={() => operate("+")}>+</button>
		<button class="large" on:click={() => inputDigit(0)}>0</button>
		<button on:click={addDecimal}>.</button>
		<button class="operator" on:click={handleClickEqual}>=</button>
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
	}

	.calculator {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		width: 400px;
		height: 500px;
		background-color: rgb(209, 240, 252);
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
	}

	.display {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 36px;
		font-weight: bold;
		background-color: #fff;
		border-radius: 8px;
		padding: 0 16px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	}

	.buttons {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(5, 1fr);
		grid-gap: 8px;
		height: 300px;
		width: 100%;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid transparent;
		width: 100%;
		height: 100%;
		font-size: 24px;
		font-weight: bold;
		border-radius: 8px;
		color: #fff;
		background-color: #333;
		cursor: pointer;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease-in-out;
	}

	button:hover {
		background-color: #555;
	}

	.operator {
		background-color: #ff9500;
	}

	.large {
		grid-column: 1 / span 2;
	}
</style>
