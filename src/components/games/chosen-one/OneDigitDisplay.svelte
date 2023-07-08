<script lang="ts">
	export let value: number | undefined = undefined;
	let prev: string;
	let current: string;
	let next: string;
    if (value === undefined) {
		prev = '&nbsp;';
		current = '&nbsp;&nbsp;&nbsp;';
		next = '&nbsp;';
	} else {
		prev = ((value - 1) % 10).toFixed(0);
		current = (value % 10).toFixed(0);
		next = ((value + 1) % 10).toFixed(0);
	}
</script>

<div class="digit">
	{@html current}
</div>

<style lang="scss">
	.digit {
        position:relative;
        left:px(-6);
        font-size: px(22);
		line-height: 1;
		border-top-left-radius: px(6) px(22);
		border-bottom-left-radius: px(6) px(22);
		padding: px(2) px(7) px(5) px(3);
		background-color: hsl(0, 0%, 50%);
		color: hsl(0, 0%, 93%);
		margin-left: px(-5);
		font-family: label-font();
		text-shadow: px(1) px(1) px(0) rgba(0, 0, 0, 0.5),
            px(1) px(-1) px(0) rgba(0, 0, 0, 0.5),
            px(-1) px(1) px(0) rgba(0, 0, 0, 0.5),
            px(-1) px(-1) px(0) rgba(0, 0, 0, 0.5);
		box-shadow: inset 0 px(1) px(4) px(1) rgba(0, 0, 0, 0.5),
            px(-0.5) 0 px(0.4) px(0.1) rgba(255, 255, 255, 0.35),
            px(-1) 0 px(0.5) 0 rgba(0, 0, 0, 0.5),
            inset 0 px(-6) px(2) 0 rgba(0,0,0, 0.8),
            inset 0 px(6) px(2) 0 rgba(0,0,0, 0.8);
	}
</style>
