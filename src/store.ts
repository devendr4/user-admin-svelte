import { writable } from 'svelte/store';
import type { User } from './types';

export const isModalOpen = writable(false);

export const userList = writable<User[]>([]);
