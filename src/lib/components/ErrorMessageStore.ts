import { writable } from 'svelte/store';
import { Modals, showModal } from './ModalManager.svelte';

export const errorMessage = writable<string>('');

errorMessage.subscribe((m) => {
  if (m !== '') {
    showModal(Modals.ErrorMessage);
  }
});
