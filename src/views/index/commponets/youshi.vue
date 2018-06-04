<template>
    <div class="warp">
        <div class="cont">

        </div>
        <div class="text">
            <div style="text-align: center;font-size: 19px; font-weight: 600;width: 100%">超低门槛</div>
            <div style="text-align: center;font-size: 15px; width: 100%;height: 25px; height:25px; line-height: 25px;color: #68655f;margin-top: 12px">
                最低1000元信用金
            </div>
            <div style="text-align: center;font-size: 15px; width: 100%;height: 25px; height:25px; line-height: 25px;color: #68655f">
                即可创建最高8000元A股策略
            </div>
        </div>
        <div class="info">


        </div>

    </div>

</template>

<script>
	export default {
		name: "youshi",
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

    .warp {
        height: 400px;
        width: 300px;
        background: #ffe5a7;
        position: relative;
    }

    .info {
        height: 400px;
        width: 300px;
        background: #F6F1ED;

    }

    .cont {
        background: #ffffff;
        height: 120px;
        width: 120px;
        border-radius: 100px;
        position: absolute;
        margin: auto;
        top: -110px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        border: 4px solid #D89E4C;
    }

    .text:hover + .info, .info:hover {
        animation: myfirst 4s ease-in-out;
        -webkit-animation: myfirst 4s ease-in-out; /* Safari and Chrome */
        animation-direction: alternate;
    }

    @keyframes myfirst {
        0% {
            transform: rotateY(0);
            background: #F6F1ED;

        }

        50% {
            transform: rotateY(360deg);
            background: #ffe5a7;
        }

        100% {
            transform: rotateY(0deg);
            background: #F6F1ED;
        }
    }

    .text {
        position: absolute;
        top: 231px;
        width: 100%;
        z-index: 100;
    }
</style>