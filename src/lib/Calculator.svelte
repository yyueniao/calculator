<script lang="ts">
	type Operator = "+" | "-" | "*" | "/";

	function clear(): void {}

	function backSpace(): void {}

	function operate(operator: Operator): void {}

	function inputDigit(value: number): void {}

	function addDecimal(): void {}

	function calculate(): void {}
</script>

<div class="calculator">
	<div class="display">
		{0}
	</div>
	<div class="buttons">
		<button class="large" on:click={clear}>C</button>
		<button on:click={backSpace}>&larr;</button>
		<button class="operator" on:click={() => operate("/")}>÷</button>
		<button on:click={() => inputDigit(7)}>7</button>
		<button on:click={() => inputDigit(8)}>8</button>
		<button on:click={() => inputDigit(9)}>9</button>
		<button class="operator" on:click={() => operate("*")}>×</button>
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
		<button class="operator" on:click={calculate}>=</button>
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
