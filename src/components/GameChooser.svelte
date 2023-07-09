<script lang="ts">
	import type { ComponentType } from 'svelte';
	import VaultDweller from './games/VaultDweller.svelte';
	import ChosenOne from './games/ChosenOne.svelte';
	import LoneWanderer from './games/LoneWanderer.svelte';
	import SoleSurvivor from './games/SoleSurvivor.svelte';
	import Courier from './games/Courier.svelte';

	const games: { [key: string]: [ComponentType, string, string] } = {
		VaultDweller: [VaultDweller, 'Classic', 'VaultDweller'],
		ChosenOne: [ChosenOne, '2', 'Chosen One'],
		LoneWanderer: [LoneWanderer, '3', 'Lone Wanderer'],
		Courier: [Courier, 'NV', 'The Courier'],
		SoleSurvivor: [SoleSurvivor, '4', 'VaultDweller 4']
	};

	let chosenGame = 'ChosenOne';
	$: Selected = games[chosenGame][0];
</script>

<div class="root">
	<div class="chosen">
		{#each Object.keys(games) as value (value)}
			<h1 class:selected={chosenGame === value}>
				{games[value][2]}
			</h1>
		{/each}
	</div>
	<div class="chooser">
		{#each Object.keys(games) as value (value)}
			<label class:selected={chosenGame === value}>
				<input type="radio" name="game" bind:group={chosenGame} {value} id={value} />
				{games[value][1]}
			</label>
		{/each}
	</div>
	<div class="page">
		<svelte:component this={Selected} />
	</div>
</div>

<style lang="scss">
	.root {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(33, 1fr);
		grid-column-gap: 0;
		grid-row-gap: 0;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.chooser {
		width: 100%;
		font-size: px(36);
		text-transform: uppercase;
		grid-area: 1 / 4 / 2 / 6;
		display: flex;
		justify-content: right;
	}
	.chooser input {
		visibility: hidden;
		overflow: hidden;
		width: 0;
		display: none;
	}
	.chooser label {
		@include big-button-style();
	}

	.chooser label:hover,
	.chooser label.selected {
		@include big-button-style-hover();
	}

	.chooser label:active {
		@include big-button-style-active();
	}

	.chosen {
		grid-area: 1 / 1 / 2 / 4;
		position: relative;
		overflow: hidden;
	}
	.chosen h1 {
		position: absolute;
		padding: 0;
		margin: 0;
		bottom: 100%;
		font-size: px(36);
		@include big-button-style();
		text-transform: uppercase;
		font-weight: normal;
		transition: bottom 0.2s linear;
	}
	.chosen h1.selected {
		@include big-button-style-hover();
		bottom: 0;
	}
	.chosen h1.selected ~ h1 {
		bottom: -100%;
	}
	.page {
		grid-area: 2 / 1 / 34 / 6;
		position: relative;
	}
</style>
