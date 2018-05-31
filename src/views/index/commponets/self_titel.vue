<template>
    <div class="warp">
        <div class="title">
            ABD
        </div>

        <div  class="text">
            <div style="float: left; margin-right: 50px; width: 100%; background: #2d8ac7">1111</div>
            <div style="width: 50px;background: red">更多</div>

        </div>

    </div>
</template>

<script>
	export default {
		name: "self_titel",
		components: {},
		data() {
			return {}
		},
		methods: {},
		mounted() {
		},
		watch: {},
		created() {
		},
		destroyed() {
		}
	}
</script>

<style scoped>
    .warp{
        border-left: 4px solid #ac0003;
        height: 60px;
        padding: 0 10px;
    }

    .warp .title{
        height: 40px;
        font-size: 25px;
        color: red;
        transition: border-bottom 2s;
    }

    .warp .text{
        height: 20px;
        line-height: 25px;
        color: #8f8c86;
        clear: both;
        overflow: hidden;
    }

    .title:after {
        content: '';
        position: relative;
        bottom: -7px;
        right: 0;
        display: block;
        background: #8f8c86;
        width: 0;
        height: 1px;
        left: -1px;
        animation: clipMe 4s ease infinite;
        animation-direction:alternate;

    }

    @keyframes clipMe {
        0% {
            width: 0%;
        }
        100% {
            width: 100%;
        }

    }

</style>