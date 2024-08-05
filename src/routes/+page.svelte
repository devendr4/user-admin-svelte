<script lang="ts">
	import '../app.css';
	import Button from '$lib/components/Button.svelte';
	import Table from '$lib/components/Table.svelte';
	import Modal from '$lib/components/Modal.svelte';
	let isOpen = false;
</script>

<h1
	class="mt-10 ml-16 uppercase border-b border-b-gray font-marcellus text-4xl spacing tracking-normal"
>
	redsky coding challenge
</h1>
<div class="m-10">
	<Table />
	<Modal {isOpen} />
</div>
