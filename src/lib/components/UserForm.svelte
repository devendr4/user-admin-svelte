<script lang="ts">
	import { editedUser, getUsers, isModalOpen } from '../../store';
	import type { User } from '../../types';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';

	let userData: User | undefined = { first_name: '', last_name: '', email: '', avatar: '' };
	export let form: any;

	editedUser.subscribe((v) => {
		userData = v;
		form = { ...form, ...userData };
		console.log('edit', form);
		console.log(userData, form);
	});
	const { enhance, reset } = superForm(
		{ ...form, ...userData },
		{
			resetForm: true,
			applyAction: true,

			onError: ({ result }) => {
				console.log(result);
				toast.error("User couldn't be created!");
				reset();
				editedUser.set(undefined);
			},
			onResult: ({ result }) => {
				if (result.type == 'success') {
					toast.success('User was successfully created!');
					reset();
					getUsers();
					editedUser.set(undefined);
					isModalOpen.set(false);
				}
			}
		}
	);
</script>

<form class="flex -mx-2 flex-col gap-2" use:enhance method="POST" on:submit={() => {}}>
	<input class="hidden" type="hidden" name="id" value={form.id} />
	<Input name="first_name" label="first name" value={form.first_name} />

	<Input name="last_name" label="last name" value={form.last_name} />

	<Input name="email" label="email address" value={form.email} />

	<Input name="avatar" label="avatar image link" value={form.avatar} />
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
