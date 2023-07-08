<script lang="ts">
	import OneDigitDisplay from "./OneDigitDisplay.svelte";

    export let value:number;
    let tensDigit = Math.floor(value / 10);
    let onesDigit = Math.round(value - (tensDigit * 10));
</script>

<div class="twodigit">
    <OneDigitDisplay />
    <OneDigitDisplay value={tensDigit} />
    <OneDigitDisplay value={onesDigit} />
    <OneDigitDisplay />
</div>

<style lang="scss">
    .twodigit{
        display:flex;
        overflow:hidden;
        width:px(48);
        position:relative;
        border-top: px(3) solid darken($root-bg, 10%);
        border-right: px(3) solid darken($root-bg, 10%);
        border-left: px(3) solid lighten($root-bg, 10%);
        border-bottom: px(3) solid lighten($root-bg, 10%);
    }
</style>

