<script lang="ts">
	import TwoDigitDisplay from './TwoDigitDisplay.svelte';

	export let label: string;
	export let value: number;
	export let min = 1;
	let descriptors = [
		'V.Bad',
		'Bad',
		'Poor',
		'Fair',
		'Avrg',
		'Good',
		'V.Good',
		'Great',
		'Exclnt',
		'Heroic'
	];
	function incr() {
		value = value < 10 ? value + 1 : value;
	}
	function decr() {
		value = value > min ? value - 1 : value;
	}
</script>

<div class="attribute">
	<div class="label">
		{label}
	</div>
	<div class="twodigit-attr">
		<TwoDigitDisplay {value} />
	</div>
	<div class="description">
		{descriptors[value - 1]}
	</div>
	<div class="manipulators">
		<button class="incr" on:click={incr}>+</button>
		<button class="decr" on:click={decr}>-</button>
	</div>
</div>

<style lang="scss">
	.attribute {
		box-sizing: border-box;
		padding: px(5) px(9);
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}
	.label {
		color: $title-color;
		width: px(18);
		text-align: center;
		font-family: title-font();
		font-size: px(36);
	}
	.twodigit-attr {
		position: relative;
		&::after,
		&::before {
			position: absolute;
			top: 50%;
			content: ' ';
			background-color: $title-color;
			margin-top: px(-2);
			height: px(4);
		}
		&::after {
			left: 105%;
			width: px(10);
		}
		&::before {
			right: 105%;
			width: px(15);
		}
	}
	.description {
		background-color: $terminal-bg;
		color: $terminal-text;
		width: px(55);
		height: px(28);
		line-height: px(28);
		text-align: left;
		padding-left: px(4);
		border-top: px(3) solid darken($root-bg, 20%);
		border-right: px(3) solid lighten($root-bg, 10%);
		border-left: px(3) solid lighten($root-bg, 25%);
		border-bottom: px(3) solid lighten($root-bg, 40%);
	}
	.manipulators {
		display: flex;
		flex-direction: column;
		button {
			display: block;
			box-sizing: border-box;
			border: 0;
			margin: 0;
			padding: 0;
			color: transparent;
			height: px(20);
			width: px(30);
			background-color: $root-bg;
			border-radius: px(3) px(4);
			line-height: px(14);
			box-shadow: inset px(-3) px(3) px(3) px(1) rgba(255, 255, 255, 0.25),
				inset px(3) px(-3) px(3) 0 rgba(darken($root-bg, 50%), 0.5),
				px(-3) px(3) px(3) 0 rgba(0, 0, 0, 0.5);
			&.incr,
			&.decr {
				position: relative;
				&::after,
				&::before {
					content: ' ';
					position: absolute;
					background-color: $title-color;
				}
			}
			&.incr {
				&::after {
					width: px(2);
					top: 20%;
					bottom: 20%;
					left: 50%;
					margin-left: px(-2);
				}
			}
			&.incr,
			&.decr {
				&::before {
					top: 50%;
					left: 20%;
					right: 20%;
					margin-top: px(-1);
					height: px(2);
				}
			}
		}
	}
</style>
