<script lang="ts">
  export let type: 'button' | 'link' = 'button';
  export let href = '';
  export let target = '_self';
</script>

{#if type === 'button'}
  <button
    on:click
    class="btn"
  >
    <div class="worn-text">
      <slot />
    </div>
  </button>
{:else if type === 'link'}
  <a
    {href}
    {target}
    on:click
    class="btn"
  >
    <div class="worn-text">
      <slot />
    </div>
  </a>
{/if}

<style lang="postcss">
  .btn {
    appearance: none;
    overflow: visible;
    background-color: hsla(var(--menu-bg));
    font-size: inherit;
    display: block;
    border: 0;
    text-decoration: none;
    text-align: center;
    line-height: inherit;
    /* prettier-ignore */
    box-shadow:
      inset 3rem 3rem 3rem -2rem rgba(255, 255, 255, 0.35)
      ,
      inset -3rem -3rem 3rem -2rem rgba(0, 0, 0, 0.85)
      ,
      var(--shadow-border)
      ,
      -1rem -1rem 1rem 1rem rgba(0, 0, 0, 0.50)
      ,
      1rem 1rem 1rem 1rem  rgba(255, 255, 255, 0.10)
      ;
  }
</style>
