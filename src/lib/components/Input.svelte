<script lang="ts">
	export let label: string;
	export let value: string;
</script>

<div class="flex flex-col">
	<label class="uppercase font-montserrat font-semibold text-darkBlue">{label}</label>
	<input class="border-gray border" {value} />
</div>
