<script lang="ts">
  import { onMount } from 'svelte';
  import {
    cacheCanvasSnapshotGetData,
    canRelyOnServiceWorker,
    generateCachedCSS,
    generateDataUrlCSS,
    getCached
  } from '$lib/GeneratedImageTools';

  export let name: string;
  export let width: number;
  export let height: number;
  export let applyToProperties: string[] = [];

  export let render = (
    ctx: CanvasRenderingContext2D,
    name: string,
    width: number,
    height: number
  ) => {
    ctx.filter = `url(#${name})`;
    ctx.fillRect(width, height, width, height);
  };

  let canvas: HTMLCanvasElement;

  // Use rendered to remove the support materials from the document when done
  let rendered = false;
  let styles: string[] = [];

  onMount(async () => {
    let ctx = canvas.getContext('2d');
    if (ctx === null) {
      return;
    }
    const resetCanvas = (width: number, height: number) => {
      if (ctx === null) {
        return;
      }
      ctx.filter = 'url()';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = width;
      canvas.height = height;
    };

    let found = await getCached(name);

    if (found !== undefined) {
      if (canRelyOnServiceWorker()) {
        styles.push(generateCachedCSS(name, applyToProperties));
        styles = styles;
        // it's in the cache, and the service worker is present, so move on
        rendered = true;
        return;
      } else {
        // navigator.serviceWorker.controller is null after a hard refresh
        // which means that the attempt to load generated images will 404
        // so instead we treat it the same as a first load: render it,
        // stuff it in the cache and use it as a data url in the
        // generated css rule (see below)
      }
    }

    resetCanvas(width, height);

    render(ctx, name, width, height);

    const dataURL = await cacheCanvasSnapshotGetData(canvas, name);
    styles.push(generateDataUrlCSS(name, applyToProperties, dataURL));
    styles = styles;

    rendered = true;
  });
</script>

<svelte:head>
  {#if styles.length > 0}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -- not subject to user input -->
    {@html `
      <style type="text/css">${styles.join('\n')}</style>
    `}
  {/if}
</svelte:head>

{#if !rendered}
  <div class="offscreen">
    <slot />

    <canvas bind:this={canvas} />
  </div>
{/if}
