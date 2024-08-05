<script lang="ts">
	import { isModalOpen } from '../../store';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
</script>

<div class="-mx-2">
	<form class="flex flex-col gap-2">
		<Input label="first name" />

		<Input label="last name" />

		<Input label="email address" />

		<Input label="avatar image link" />
		<span class="flex justify-end mt-10 gap-2">
			<Button outline onClick={() => isModalOpen.set(false)}>cancel</Button>
			<Button
				onClick={() => {
					console.log(2);
				}}>create</Button
			>
		</span>
	</form>
</div>
