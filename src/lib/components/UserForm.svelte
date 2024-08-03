<script lang="ts">
	import type { User } from '../../types';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import TitleBanner from './TitleBanner.svelte';
	let userData: User;
</script>

<div class="w-2/5">
	<TitleBanner>{userData ? 'edit' : 'new'} user</TitleBanner>
	<form class="flex flex-col gap-2">
		<Input label="first name" />

		<Input label="last name" />

		<Input label="email address" />

		<Input label="avatar image link" />
		<span class="flex justify-end gap-2">
			<Button outline>cancel</Button>
			<Button>create</Button>
		</span>
	</form>
</div>
