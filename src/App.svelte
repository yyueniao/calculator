<script lang="ts">
	import Calculator from "./lib/Calculator.svelte";
	import { onMount } from "svelte";
	import type { Operation } from "./types";

	let db: IDBDatabase;

	onMount((): void => {
		const request = indexedDB.open("calculator", 1);

		request.onupgradeneeded = () => {
			db = request.result;

			const objectStore = db.createObjectStore("operations", {
				keyPath: "operationNo",
				autoIncrement: false,
			});
			objectStore.createIndex("operator", "operator", { unique: false });
		};

		request.onsuccess = () => {
			db = request.result;
			console.log("database created successfully.");

			db.onerror = () => {
				console.error("Error from IndexedDB: ", request.error);
			};
		};
	});

	function getCount(): IDBRequest<number> {
		const transaction = db.transaction("operations", "readonly");
		const objectStore = transaction.objectStore("operations");
		return objectStore.count();
	}

	function addTransaction({ operator, operand1, operand2 }: Operation) {
		let operationNo: number | null = null;
		const countRequest = getCount();
		countRequest.onsuccess = () => {
			operationNo = countRequest.result + 1;
			const transaction = db.transaction(["operations"], "readwrite");
			const objectStore = transaction.objectStore("operations");

			const request = objectStore.add({
				operationNo,
				operator,
				operand1,
				operand2,
			});
			request.onsuccess = () => {
				console.log(
					"Transaction added to IndexedDB:",
					operand1,
					operator,
					operand2
				);
			};
		};
	}
</script>

<main>
	<div class="card">
		<Calculator {addTransaction} />
	</div>
</main>
