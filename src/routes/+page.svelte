<script lang="ts">
	import '../app.css';
	import Button from '$lib/components/Button.svelte';
	import Table from '$lib/components/Table.svelte';
</script>

<div class="m-10">
	<h1 class="uppercase font-marcellus text-4xl spacing tracking-normal">redsky coding challenge</h1>
	<span class="flex justify-end">
		<Button>create new user</Button>
	</span>
	<Table />
</div>
