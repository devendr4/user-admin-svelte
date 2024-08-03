<script lang="ts">
	export const outline: boolean = false;
	export let large: boolean = false;
</script>

<button
	class={`${outline ? 'bg-white text-primary border-primary border-2' : 'bg-primary text-white'} ${large && 'px-20'} font-bold py-1 px-5  uppercase`}
>
	<slot />
</button>
