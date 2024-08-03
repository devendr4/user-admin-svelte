<script lang="ts">
	import { onMount } from 'svelte';
	import { apiData, users } from '../../store';

	onMount(async () => {
		const response = await fetch('http://localhost:3000/users');
		const data = await response.json();
		apiData.set(data);
		console.log(users);
	});
</script>

<div>User list</div>
{#each $users as user}
	<p>{user}</p>
{/each}
<table></table>
