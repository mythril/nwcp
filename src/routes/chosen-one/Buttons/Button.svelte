<script lang="ts">
  export let type: 'button' | 'link' = 'button';
  export let href = '';
  export let target = '_self';
</script>

{#if type === 'button'}
  <button
    on:click
    class={'btn ' + ($$props.class || '')}
  >
    <slot />
  </button>
{:else if type === 'link'}
  <a
    {href}
    {target}
    on:click
    class={'btn ' + ($$props.class || '')}
  >
    <slot />
  </a>
{/if}
