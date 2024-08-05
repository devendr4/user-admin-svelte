<script lang="ts">
	export let label: string;
	export let value: string = '';
	export let name: string;
</script>

<div class="flex flex-col">
	<label for={name} class="uppercase font-montserrat font-semibold text-darkBlue">{label}</label>
	<input bind:value class="border-gray border" {name} />
</div>
