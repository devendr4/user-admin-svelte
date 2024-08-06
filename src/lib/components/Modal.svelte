<script lang="ts">
	import type { User } from '../../types';
	import TitleBanner from './TitleBanner.svelte';
	import { editedUser, isModalOpen } from '../../store';
	import UserForm from './UserForm.svelte';

	export let userData: User | undefined = undefined;
	let modalState: boolean;
	export let form;
	isModalOpen.subscribe((v) => (modalState = v));
	editedUser.subscribe((v) => {
		modalState = !!v;
		userData = v;
	});
</script>

<div
	class={`relative ${modalState ? 'z-10' : '-z-10'} `}
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div
		class={`fixed inset-0 bg-darkBlue  bg-opacity-0  ${modalState && 'bg-opacity-60'}  transition-opacity`}
		aria-hidden="true"
	></div>

	<div
		class={`fixed inset-0 z-20  w-screen   opacity-${modalState ? '100 ' : '0 hidden'}  overflow-y-auto`}
	>
		<div class="flex min-h-full items-center justify-center p-2 md:p-4 text-center sm:items-center">
			<div
				class="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
			>
				<TitleBanner>{userData ? 'edit' : 'create new'} user</TitleBanner>
				<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
					<UserForm formValues={form} />
				</div>
			</div>
		</div>
	</div>
</div>
