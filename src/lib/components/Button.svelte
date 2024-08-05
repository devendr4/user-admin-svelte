<script lang="ts">
	export let outline: boolean = false;
	export let large: boolean = false;
	export let action: boolean = false;
	export let onClick: () => void;
	export let type: 'button' | 'reset' | 'submit' | null | undefined = undefined;
</script>

<button
	{type}
	on:click={onClick}
	class={`${outline ? ' bg-white text-primary border-primary border-2' : 'bg-primary text-white'} ${large ? 'px-20' : action ? 'px-2' : 'px-5'} font-bold py-0.5  cursor-pointer tracking-wide uppercase`}
>
	<slot />
</button>
