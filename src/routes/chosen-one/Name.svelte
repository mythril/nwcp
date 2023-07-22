<script lang="ts">
  import BigCaret from './BigCaret.svelte';
  import PlateButton from './PlateButton.svelte';
  import SlateButton from './SlateButton.svelte';

  export let name = '';
  let showEdit = false;
  let cancel = () => {
    showEdit = false;
  };
  let commit = () => {
    name = text;
    showEdit = false;
  };
  function controlKeys(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      cancel();
      return false;
    }
    if (event.code === 'Escape') {
      cancel();
      return false;
    }
    if (event.keyCode === 13) {
      commit();
      return false;
    }
    if (event.code === 'Enter') {
      commit();
      return false;
    }
    return false;
  }

  function show() {
    text = name;
    showEdit = true;
  }
  let text = '';
</script>

<div class="relative">
  <SlateButton on:click={show}>
    {name || 'none'}
  </SlateButton>

  {#if showEdit}
    <div class="backdrop" />
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div
      role="dialog"
      class="edit"
      on:keydown={controlKeys}
    >
      <div class="main">
        <BigCaret
          class="input-name"
          bind:value={text}
        />
      </div>
      <div class="button">
        <PlateButton
          class="btn-done"
          on:click={commit}>Done</PlateButton
        >
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .backdrop {
    position: fixed;
    left: -100vw;
    top: -100vh;
    right: -100vw;
    bottom: -100vh;
    z-index: 2;
  }
  .edit {
    position: absolute;
    min-width: 100%;
    left: px(2);
    padding-top: px(13);
    padding-left: px(20);
    padding-right: px(20);
    padding-bottom: px(9);
    top: 0;
    z-index: 3;
    background-color: $root-bg;
    box-shadow: basic-box-shadow(),
      inset px(5) px(-5) px(5) px(0) rgba(#000, 0.75);
    .main {
      margin-bottom: px(8);
    }
    :global(.input-name) {
      width: 100%;
      margin: 0 auto;
      font-size: px(10);
      line-height: 1.6;
      padding-left: 1em;
      padding-right: 1em;
      border-top: px(3) solid darken($root-bg, 10%);
      border-left: px(4) solid lighten($root-bg, 45%);
      border-right: px(4) solid lighten($root-bg, 5%);
      border-bottom: px(3) solid lighten($root-bg, 25%);
      background-color: $terminal-bg;
      color: $terminal-text;
    }
  }
  :global(.btn-done) {
    width: 100%;
    filter: drop-shadow(px(-1) px(2) px(2) #000);
  }
  .relative {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
