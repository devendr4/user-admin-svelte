<script lang="ts">
	import axios from 'axios';
	import { editedUser, isModalOpen } from '../../store';
	import type { User } from '../../types';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import toast from 'svelte-french-toast';
	import { superForm, setMessage, setError, superValidate } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let userData: User | undefined = { first_name: '', last_name: '', email: '', avatar: '' };
	let first_name = userData?.first_name;
	let last_name = userData?.last_name;
	let email_address = userData?.email;
	let avatar = userData?.avatar;
	export let data;

	const { enhance } = superForm(data?.form, {
		SPA: true,
		validators: zod(schema),
		onUpdate({ form }) {
			// Form validation
			if (form.data.email.includes('spam')) {
				setError(form, 'email', 'Suspicious email address.');
			} else if (form.valid) {
				// TODO: Call an external API with form.data, await the result and update form
				setMessage(form, 'Valid data!');
			}
		}
	});

	editedUser.subscribe((v) => (userData = v));

	async function handleSubmit() {
		if (userData) {
			await axios.put(PUBLIC_API_URL + 'user', {
				first_name: first_name,
				last_name: last_name,
				email_address: email_address,
				avatar: avatar
			});
			toast.success('User succesfully updated!');
		} else {
			await axios.post(PUBLIC_API_URL + 'user', {
				first_name: first_name,
				last_name: last_name,
				email_address: email_address,
				avatar: avatar
			});
			toast.success('User succesfully created!');
		}
	}
</script>

<div class="-mx-2">
	<form class="flex flex-col gap-2" use:enhance>
		<Input name="first_name" label="first name" value={first_name} />

		<Input name="last_name" label="last name" value={last_name} />

		<Input name="email_address" label="email address" value={email_address} />

		<Input name="avatar" label="avatar image link" value={avatar} />
		<span class="flex justify-end mt-10 gap-2">
			<Button
				outline
				onClick={() => {
					isModalOpen.set(false);
					editedUser.set(undefined);
				}}>cancel</Button
			>
			<Button type="submit" onClick={handleSubmit}>{userData ? 'save' : 'create'}</Button>
		</span>
	</form>
</div>
