<script lang="ts">
	import { onMount } from 'svelte';
	import type { User } from '../../types';
	import Button from './Button.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import TitleBanner from './TitleBanner.svelte';
	import axios from 'axios';
	import { userList, isModalOpen, editedUser, getUsers } from '../../store';
	import toast from 'svelte-french-toast';
	let users: User[];
	userList.subscribe((u) => (users = u));

	onMount(async () => {
		await getUsers();
	});

	async function deleteUser(id: number) {
		await axios.delete(PUBLIC_API_URL + 'user/' + id);
		toast.success('User was successfully deleted!');
		await getUsers();
	}

	async function resetCache() {
		await axios.post(PUBLIC_API_URL + 'users/reset');
		toast.success('User cache was successfully cleared!');
		await getUsers();
	}
</script>

<div class="md:mx-16">
	<span class="flex justify-end gap-2">
		<Button onClick={() => isModalOpen.set(true)}>create new user</Button>
		<Button onClick={() => resetCache()}>reset user cache</Button>
	</span>
	<div class="border border-primary mt-2 md:mt-5 font-montserrat">
		<TitleBanner>User list</TitleBanner>
		<div class="overflow-auto">
			<table class="w-full">
				<thead class="py-2">
					<tr class="border-b-2 p-3 border-gray text-left">
						<th class="uppercase ml-2 py-2 font-semibold hidden md:block">avatar</th>
						<th class="uppercase px-4 font-semibold ml-2 md:ml-0 text-left">first name</th>
						<th class="uppercase px-4 font-semibold">last name</th>
						<th class="uppercase px-4 font-semibold">email address</th>
						<th class=""></th>
					</tr>
				</thead>
				<tbody>
					{#each users as user}
						<tr
							class=" items-center [&:not(:last-child)]:border-b-2
						py-0.5 px-3 border-gray border-opacity-65"
						>
							<td class="hidden md:flex ml-4">
								<img class=" h-9 w-9" src={user.avatar} alt={`avatar-${user.id}`} />
							</td>
							<td class="px-4 py-3">{user.first_name}</td>
							<td class="px-4">{user.last_name}</td>
							<td class="px-4">{user.email}</td>
							<td class="px-4">
								<span class="flex justify-end gap-2">
									<Button
										action
										onClick={() => {
											editedUser.set(user);
										}}>edit</Button
									>
									<Button action onClick={() => deleteUser(user.id as number)}>delete</Button>
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
