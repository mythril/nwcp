<script lang="ts">
	import OneDigitDisplay from "./OneDigitDisplay.svelte";

    export let value:number;
    
    let tensDigit:number;
    let onesDigit:number;
    $:{
        tensDigit = Math.floor(value / 10);
        onesDigit = Math.round(value - (tensDigit * 10));
    }
</script>

<div class="window">
<div class="twodigit">
    <OneDigitDisplay />
    <OneDigitDisplay value={tensDigit} />
    <OneDigitDisplay value={onesDigit} />
    <OneDigitDisplay />
</div>
</div>

<style lang="scss">
    .window{
        display:block;
        overflow:hidden;
        width:px(50);
        height:px(35);
        border-top: px(3) solid darken($root-bg, 10%);
        border-right: px(3) solid darken($root-bg, 10%);
        border-left: px(3) solid lighten($root-bg, 10%);
        border-bottom: px(3) solid lighten($root-bg, 10%);
    }
    .twodigit{
        display:flex;
        height:100%;
        width:px(90);
        position:relative;
        left:px(-9);
    }
</style>

