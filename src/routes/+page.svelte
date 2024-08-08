<script lang="ts">
	import '../app.css';
	import Table from '$lib/components/Table.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { Toaster } from 'svelte-french-toast';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1
	class="mt-5 mb-5 md:mb-0 md:mt-10 text-center md:text-left md:ml-16 uppercase border-b border-b-gray font-marcellus text-4xl spacing tracking-normal"
>
	redsky coding challenge
</h1>
<div class="m-2 md:m-10">
	<Table />
	<Modal {data} />
</div>
<Toaster />
