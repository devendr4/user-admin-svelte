<script lang="ts">
	import type { User } from '../../types';
	import TitleBanner from './TitleBanner.svelte';
	import { editedUser, isModalOpen } from '../../store';
	import UserForm from './UserForm.svelte';

	export let userData: User | undefined = undefined;
	let modalState: boolean;
	export let form;
	console.log(form);

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
	<!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
	<div
		class={`fixed inset-0 bg-darkBlue  bg-opacity-0 ${modalState && 'bg-opacity-60'}  transition-opacity`}
		aria-hidden="true"
	></div>

	<div
		class={`fixed inset-0 z-20  w-screen opacity-${modalState ? '100 ' : '0 hidden'}  overflow-y-auto`}
	>
		<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
			<!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->

			<div
				class="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
			>
				<TitleBanner>{userData ? 'edit' : 'create new'} user</TitleBanner>
				<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
					<UserForm {form} />
				</div>
			</div>
		</div>
	</div>
</div>
