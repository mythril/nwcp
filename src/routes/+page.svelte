<script lang="ts">
	import '../lib/scss/_global.scss';
	import GameChooser from '../components/GameChooser.svelte';

	let innerWidth: number;
	let innerHeight: number;
	let planner: HTMLDivElement;
	let width: number;
	let height: number;

	function originalFontSizeScaled(width: number) {
		// return width / 71;
		return width / 85;
	}

	$: {
		if (planner) {
			let maxWidth = Math.max(innerHeight, innerWidth);
			let maxHeight = Math.min(innerHeight, innerWidth);

			// maintains the aspect ratio I desire for the "window"
			if (maxWidth * (4 / 5) > maxHeight) {
				width = maxHeight * 1.25;
				height = maxHeight;
			} else {
				width = maxWidth;
				height = maxWidth * (4 / 5);
			}
			planner.style.width = width + 'px';
			planner.style.height = height + 'px';

			// allows me to scale things with ems later on
			planner.style.setProperty(
				'font-size',
				originalFontSizeScaled(width) + 'px'
			);
		}
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="planner" bind:this={planner}>
	<GameChooser />
</div>

<style lang="scss">
	.planner {
		font-family: terminal-font();
		display: block;
		position: relative;
		background-color: $root-bg;
		border: 0;
		margin:0 auto;
	}
</style>
