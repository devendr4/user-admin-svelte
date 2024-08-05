<script lang="ts">
	import { onMount } from 'svelte';
	import type { User } from '../../types';
	import Button from './Button.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import TitleBanner from './TitleBanner.svelte';
	import axios from 'axios';
	import { userList } from '../../store';
	import { isModalOpen } from '../../store';
	import toast from 'svelte-french-toast';
	let users: User[];
	userList.subscribe((u) => (users = u));

	onMount(async () => {
		await getUsers();
	});

	async function getUsers() {
		const response = await axios.get(PUBLIC_API_URL + 'users');
		const data = await response.data;
		userList.set(data.users);
	}

	async function deleteUser(id: number) {
		await axios.delete(PUBLIC_API_URL + 'user/' + id);
		toast.success('User was successfully deleted!', { position: 'bottom-right' });
		await getUsers();
	}
</script>

<div class="mx-16">
	<span class="flex justify-end">
		<Button onClick={() => isModalOpen.set(true)}>create new user</Button>
	</span>
	<div class="border border-primary mt-5 overflow-x-auto font-montserrat">
		<TitleBanner>User list</TitleBanner>
		<div class="flex gap-4 border-b-2 p-3 border-gray">
			<span class="uppercase w-2/12 font-semibold">avatar</span>
			<span class="uppercase w-3/12 font-semibold">first name</span>
			<span class="uppercase w-3/12 font-semibold">last name</span>
			<span class="uppercase w-3/12 font-semibold">email address</span>
			<span class="w-4/12"></span>
		</div>
		{#each users as user}
			<div
				class="flex gap-4 items-center [&:not(:last-child)]:border-b-2 py-0.5 px-3 border-gray border-opacity-65"
			>
				<span class="w-2/12 flex ml-4">
					<img class=" h-9 w-9" src={user.avatar} alt={`avatar-${user.id}`} />
				</span>
				<p class="w-3/12">{user.first_name}</p>
				<p class="w-3/12">{user.last_name}</p>
				<p class="w-3/12">{user.email}</p>
				<span class="w-4/12 flex justify-end gap-5 items-center">
					<Button action onClick={() => isModalOpen.set(true)}>edit</Button>
					<Button action onClick={() => deleteUser(user.id)}>delete</Button>
				</span>
			</div>
		{/each}
	</div>
</div>
