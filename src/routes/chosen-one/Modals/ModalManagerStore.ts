import type { ComponentType, SvelteComponent } from "svelte";
import { writable } from "svelte/store";

export interface Mode {
  enter(): void;
  leave(): void;
}

export type ModeProps = Record<string, any> & Mode;

export type ModalComponentInstance = SvelteComponent & Mode;

export type ModalComponentConstructor = ComponentType<ModalComponentInstance>;

export const modals = writable<ModalComponentConstructor[]>([]);

