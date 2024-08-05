import { writable } from 'svelte/store';
import type { User } from './types';

export const isModalOpen = writable(false);

export const userList = writable<User[]>([]);

export const editedUser = writable<User | undefined>();
