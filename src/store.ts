import { writable, derived } from 'svelte/store';

export const apiData = writable([]);

export const users = derived(apiData, ($apiData) => {
	if ($apiData.data) {
		return $apiData.data;
	}
	return [];
});
