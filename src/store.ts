import { writable } from 'svelte/store';
import axios from 'axios';
import type { User } from './types';
import { PUBLIC_API_URL } from '$env/static/public';

export const isModalOpen = writable(false);

export const userList = writable<User[]>([]);

export const editedUser = writable<User | undefined>();

export async function getUsers() {
	const response = await axios.get(PUBLIC_API_URL + 'users');
	const data = await response.data;
	userList.set(data.users);
}
