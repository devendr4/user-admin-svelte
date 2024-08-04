<script lang="ts">
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
			<Button outline>cancel</Button>
			<Button>create</Button>
		</span>
	</form>
</div>
