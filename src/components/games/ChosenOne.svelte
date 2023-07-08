<script lang="ts">
	import { Special, SpecialAbbreviation } from "../../engines/ChosenOne";
    import Attribute from "./chosen-one/Attribute.svelte";
	import Bolthead from "./chosen-one/Bolthead.svelte";
	import TwoDigitDisplay from "./chosen-one/TwoDigitDisplay.svelte";

	let name = 'NONE';
	let age = 25;
	let sex = 'MALE';
</script>

<div class="parent">
	<div class="name-age-sex">
		<div class="name">
			{name}
		</div>
		<div class="age">
			AGE {age}
		</div>
		<div class="sex">
			{sex}
		</div>
	</div>
	<div class="special">
        {#each Object.values(Special) as attr}
            <Attribute label={SpecialAbbreviation(attr)} value={Math.round((Math.random() * 9) + 1)} />
        {/each}
    </div>
	<div class="health">
		<div class="display">
			<div class="highlighted">Hit Points 30/30</div>
			<div>Poisoned</div>
			<div>Radiated</div>
			<div>Eye Damage</div>
			<div>Crippled Right Arm</div>
			<div>Crippled Left Arm</div>
			<div>Crippled Right Leg</div>
			<div>Crippled Left Leg</div>
		</div>
        <Bolthead dir="tl" />
        <Bolthead dir="tr" />
        <Bolthead dir="bl" />
        <Bolthead dir="br" />
        <Bolthead dir="ml" />
        <Bolthead dir="mr" />
	</div>
	<div class="derived-stats">
		<div class="display">
			<table class="highlighted">
				<tbody>
					<tr>
						<th> Armor class </th>
						<td> 5 </td>
					</tr>
					<tr>
						<th> Action Points </th>
						<td> 7 </td>
					</tr>
					<tr>
						<th> Carry Weight </th>
						<td> 150 </td>
					</tr>
					<tr>
						<th> Melee Damage </th>
						<td> 1 </td>
					</tr>
					<tr>
						<th> Damage Res. </th>
						<td> 0% </td>
					</tr>
					<tr>
						<th> Poison Res. </th>
						<td> 25% </td>
					</tr>
					<tr>
						<th> Radiation Res. </th>
						<td> 10% </td>
					</tr>
					<tr>
						<th> Sequence </th>
						<td> 10 </td>
					</tr>
					<tr>
						<th> Healing Rate </th>
						<td> 1 </td>
					</tr>
					<tr>
						<th> Critical Chance </th>
						<td> 5% </td>
					</tr>
				</tbody>
			</table>
		</div>
        <Bolthead dir="ml" />
        <Bolthead dir="tr" />
        <Bolthead dir="tl" />
        <Bolthead dir="br" />
        <Bolthead dir="bl" />
        <Bolthead dir="mr" />
	</div>
	<div class="char-points">
        <div class="label">
            CHAR POINTS
        </div>
        <TwoDigitDisplay value={Math.round((Math.random() * 10) + 1)} />
        <Bolthead dir="tl" />
        <Bolthead dir="tr" />
        <Bolthead dir="bl" />
        <Bolthead dir="br" />
    </div>
	<div class="traits" />
	<div class="tagged-skills" />
	<div class="help" />
	<div class="buttons" />
</div>

<style lang="scss">
	.parent {
		display: grid;
		grid-template-columns: repeat(2, 26.0625%) 45.875%;
		grid-template-rows: repeat(30, 1fr);
		grid-column-gap: 1%;
		grid-row-gap: px(7);
		position: absolute;
		left: 0;
		bottom: 0;
		top: 0;
		right: 0;
	}

	.name-age-sex {
		grid-area: 1 / 1 / 3 / 3;
		display: flex;
		justify-content: center;
		text-align: center;
        font-size: px(27);
		line-height: 1.5;
		.name,
		.age,
		.sex {
			@include big-button-style(3);
			@include big-button-style-hover();
		}
		.name {
			width: 36%;
		}
		.age {
			width: 24%;
		}
		.sex {
			width: 24%;
		}
	}

	@function basic-box-shadow() {
		@return px(-10) px(10) px(6) 0 rgba(0, 0, 0, 0.75),
			inset px(-4) px(4) px(2) 0 rgba(255, 255, 255, 0.125),
			inset px(4) px(-4) px(5) px(0) rgba(darken($root-bg, 30%), 0.3);
	}

	@mixin slate() {
		background-color: $root-bg;
		box-shadow: basic-box-shadow();
	}

	@mixin display() {
		& {
			position: relative;
		}
		& .display {
			table,
			th,
			td,
			tr {
                font-weight:normal;
                text-align:left;
                padding:0;
                border:0;
				table-layout: fixed;
				border-spacing: 0;
			}
            td{
                padding-left: px(12);
            }
			padding: px(4) px(7);
			position: absolute;
			top: 5%;
			bottom: 5%;
			left: 7%;
			right: 7%;
			line-height: 1.7;
			background-color: $terminal-bg;
			border-radius: px(8) px(7);
			box-shadow: px(-4) px(4) px(4) px(0) rgba(255, 255, 255, 0.2),
				px(4) px(-4) px(4) px(0) rgba(0, 0, 0, 0.25);
			text-rendering: geometricPrecision;
			color: $terminal-text-unmarked;
			.highlighted {
				color: $terminal-text;
			}
		}
	}

	.special {
		grid-area: 3 / 1 / 17 / 2;
		@include slate();
		border-radius: px(2);
		border-bottom-left-radius: px(9) px(5);
	}
	.char-points {
		grid-area: 17 / 1 / 20 / 2;
        position:relative;
		@include slate();
		border-radius: px(2);
		border-bottom-left-radius: px(5) px(3);
        display:flex;
        justify-content:space-evenly;
        align-items:center;
        .label {
            font-family: title-font();
            color: $title-color;
            font-size: px(30);
        }
	}
	.health {
		grid-area: 3 / 2 / 11 / 3;
		@include slate();
		@include display();
		border-radius: px(7);
	}
	.derived-stats {
		grid-area: 11 / 2 / 20 / 3;
		@include slate();
		@include display();
		border-radius: px(7);
	}
	.tagged-skills {
		grid-area: 1 / 3 / 17 / 4;
		background-color: purple;
	}
	.traits {
		grid-area: 20 / 1 / 31 / 3;
		background-color: gold;
	}
	.help {
		grid-area: 17 / 3 / 29 / 4;
		background-color: yellow;
	}
	.buttons {
		grid-area: 29 / 3 / 31 / 4;
		background-color: red;
	}
</style>
