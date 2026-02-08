<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
  export let type: 'button' | 'link' = 'button';
  export let href = '';
  export let target = '_self';
</script>

{#if type === 'button'}
  <button
    on:click
    on:mouseover
    on:focus
    class={'btn ' + ($$props.class || '')}
  >
    <slot />
  </button>
{:else if type === 'link'}
  <a
    {href}
    {target}
    data-sveltekit-preload-data
    data-sveltekit-preload-code
    on:click
    on:mouseover
    on:focus
    class={'btn ' + ($$props.class || '')}
  >
    <slot />
  </a>
{/if}
