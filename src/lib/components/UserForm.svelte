<script lang="ts">
	import axios from 'axios';
	import { editedUser, isModalOpen } from '../../store';
	import type { User } from '../../types';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import toast from 'svelte-french-toast';
	import SuperDebug, { superForm, setMessage, setError, superValidate } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let userData: User | undefined = { first_name: '', last_name: '', email: '', avatar: '' };
	export let form: any;

	const { enhance } = superForm($form);

	editedUser.subscribe((v) => (userData = v));
</script>

<div class="-mx-2">
	<SuperDebug data={$form} />
	<form class="flex flex-col gap-2" use:enhance method="POST">
		<Input name="first_name" label="first name" value={$form.first_name} />

		<Input name="last_name" label="last name" value={$form.last_name} />

		<Input name="email_address" label="email address" value={$form.email_address} />

		<Input name="avatar" label="avatar image link" value={$form.avatar} />
		<span class="flex justify-end mt-10 gap-2">
			<Button
				type="button"
				outline
				onClick={() => {
					isModalOpen.set(false);
					editedUser.set(undefined);
				}}>cancel</Button
			>
			<Button type="submit">{userData ? 'save' : 'create'}</Button>
		</span>
	</form>
</div>
