<script lang="ts">
	import '../app.css';
	import Table from '$lib/components/Table.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { Toaster } from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';

	export let data: PageData;
	const { form } = superForm(data.form);
</script>

<h1
	class="mt-10 ml-16 uppercase border-b border-b-gray font-marcellus text-4xl spacing tracking-normal"
>
	redsky coding challenge
</h1>
<div class="m-10">
	<Table />
	<Modal form={$form} />
</div>
<Toaster />
