import { Role } from '$lib/engines/all';
import type { ObjectValues } from '$lib/typeUtils';
import { writable } from 'svelte/store';

export const role = writable<ObjectValues<typeof Role>>(Role.None);
