<script lang="ts">
	import { editedUser, getUsers, isModalOpen } from '../../store';
	import type { User } from '../../types';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import Error from './Error.svelte';

	let userData: User | undefined = { first_name: '', last_name: '', email: '', avatar: '' };
	export let formValues: User;

	editedUser.subscribe((v) => {
		userData = v;
		formValues = { ...formValues, ...userData };
	});
	const { enhance, reset, errors } = superForm(
		{ ...formValues, ...userData },
		{
			resetForm: true,
			applyAction: true,

			onResult: ({ result }) => {
				if (result.type == 'success') {
					toast.success(`User was successfully ${userData ? 'edited' : 'created'}!`);
					getUsers();
					reset();
					editedUser.set(undefined);
					isModalOpen.set(false);
				}
			}
		}
	);
	console.log(errors);
</script>

<form class="flex -mx-2 flex-col gap-2" use:enhance method="POST">
	<input class="hidden" type="hidden" name="id" value={formValues.id} />
	<Input name="first_name" label="first name" value={formValues.first_name} />
	{#if $errors.first_name}<Error>{$errors.first_name}</Error>{/if}

	<Input name="last_name" label="last name" value={formValues.last_name} />
	{#if $errors.last_name}<Error>{$errors.last_name}</Error>{/if}

	<Input name="email" label="email address" value={formValues.email} />
	{#if $errors.email}<Error>{$errors.email}</Error>{/if}

	<Input name="avatar" label="avatar image link" value={formValues.avatar} />
	{#if $errors.avatar}<Error>{$errors.avatar}</Error>{/if}

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
