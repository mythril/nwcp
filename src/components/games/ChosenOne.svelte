<script lang="ts">
    let name = "NONE";
    let age = 25;
    let sex = "MALE";
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

    </div>
    <div class="health">
        <div class="display">
            text
        </div>
        
    </div>
    <div class="derived-stats">

    </div>
    <div class="char-points">

    </div>
    <div class="traits">

    </div>
    <div class="tagged-skills">

    </div>
    <div class="help">

    </div>
    <div class="buttons">

    </div>
</div>
<style lang="scss">
	.parent {
		display: grid;
		grid-template-columns: repeat(2, 26.5625%) 46.875%;
		grid-template-rows: repeat(30, 1fr);
		grid-column-gap: 7px;
		grid-row-gap: 7px;
        position:absolute;
        left:0;
        bottom:0;
        top:0;
        right:0;
	}

	.name-age-sex {
		grid-area: 1 / 1 / 3 / 3;
        display:flex;
        justify-content: center;
        text-align:center;
        font-size: 3em;
        line-height: 1.3;
        .name,
        .age,
        .sex {
            @include big-button-style(3);
            @include big-button-style-hover();
        }
        .name{
            width:36%;
        }
        .age{
            width:24%;
        }
        .sex {
            width:24%;
        }
	}

    @function basic-box-shadow() {
        @return -10px 10px 3px 0 rgba(0, 0, 0, 0.75),
            inset -5px 5px 3px 0 rgba(255,255,255,0.25),
            inset 5px -5px 0px 2px rgba(0,0,0,0.25);
    }

    @mixin slate() {
        background-color:$root-bg;
        box-shadow: basic-box-shadow();
    }

    @mixin display() {
        & {
            position:relative;
        }
        & .display{
            color: greenyellow;
            padding:2%;
            position:absolute;
            top:5%;
            bottom:5%;
            left:7%;
            right:7%;
            background-color: black;
            border-radius:20px 10px;
            box-shadow: 
                -5px 5px 5px 0px rgba(255,255,255,0.25),
                5px -5px 5px 0px rgba(0,0,0,0.25);
        }
    }

	.special {
		grid-area: 3 / 1 / 17 / 2;
        @include slate();
        border-bottom-left-radius: 30px 15px;
	}
	.char-points {
		grid-area: 17 / 1 / 20 / 2;
        @include slate();
        border-bottom-left-radius: 30px 15px;
        border-bottom-right-radius: 10px 10px;
	}
	.health {
		grid-area: 3 / 2 / 11 / 3;
        @include slate();
        @include display();
        border-radius:20px 10px;
	}
	.derived-stats {
		grid-area: 11 / 2 / 20 / 3;
        @include slate();
        @include display();
        border-radius:20px 10px;
	}
	.tagged-skills {
		grid-area: 1 / 3 / 17 / 4;
        background-color:purple;
	}
	.traits {
		grid-area: 20 / 1 / 31 / 3;
        background-color:gold;
	}
	.help {
		grid-area: 17 / 3 / 29 / 4;
        background-color:yellow;
	}
	.buttons {
		grid-area: 29 / 3 / 31 / 4;
        background-color:red;
	}
</style>
