<script lang="ts">
	import axios from 'axios';
	import { editedUser, isModalOpen } from '../../store';
	import type { User } from '../../types';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import toast from 'svelte-french-toast';

	export let userData: User | undefined = undefined;
	editedUser.subscribe((v) => (userData = v));

	async function handleSubmit(user: User | undefined) {
		if (userData) {
			await axios.put(PUBLIC_API_URL + 'user', user);
			toast.success('User succesfully updated!');
		} else {
			await axios.post(PUBLIC_API_URL + 'user', user);
			toast.success('User succesfully created!');
		}
	}
</script>

<div class="-mx-2">
	<form class="flex flex-col gap-2">
		<Input label="first name" value={userData?.first_name || ''} />

		<Input label="last name" value={userData?.last_name || ''} />

		<Input label="email address" value={userData?.email || ''} />

		<Input label="avatar image link" value={userData?.avatar || ''} />
		<span class="flex justify-end mt-10 gap-2">
			<Button
				outline
				onClick={() => {
					isModalOpen.set(false);
					editedUser.set(undefined);
				}}>cancel</Button
			>
			<Button onClick={() => handleSubmit(undefined)}>{userData ? 'save' : 'create'}</Button>
		</span>
	</form>
</div>
