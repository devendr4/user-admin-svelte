<script lang="ts">
	import { onMount } from 'svelte';
	import type { User } from '../../types';
	import Button from './Button.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import TitleBanner from './TitleBanner.svelte';
	let users: User[] = [];

	onMount(async () => {
		const response = await fetch(PUBLIC_API_URL);
		const data = await response.json();
		// apiData.set(data);
		console.log(users);
		users = data.users;
	});
</script>

<div class="border border-primary mt-5 overflow-x-auto font-montserrat">
	<TitleBanner>User list</TitleBanner>
	<div class="flex gap-4 border-b-2 p-3 border-gray">
		<span class="uppercase w-2/12 font-bold">avatar</span>
		<span class="uppercase w-3/12 font-bold">first name</span>
		<span class="uppercase w-3/12 font-bold">last name</span>
		<span class="uppercase w-3/12 font-bold">email address</span>
		<span class="w-4/12"></span>
	</div>
	{#each users as user}
		<div
			class="flex gap-4 items-center [&:not(:last-child)]:border-b-2 p-2 border-gray border-opacity-65"
		>
			<span class="w-2/12 flex ml-4">
				<img class="object-contain h-12 w-12" src={user.avatar} alt={`avatar-${user.id}`} />
			</span>
			<p class="w-3/12">{user.first_name}</p>
			<p class="w-3/12">{user.last_name}</p>
			<p class="w-3/12">{user.email}</p>
			<span class="w-4/12 flex justify-end gap-5 items-center">
				<Button action>edit</Button>
				<Button action>delete</Button>
			</span>
		</div>
	{/each}
</div>
