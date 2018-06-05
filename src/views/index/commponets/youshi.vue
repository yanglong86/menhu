<template>
    <div class="warp">
        <div class="cont0">

        </div>
        <div class="cont">
            <svg-icon :icon-class="conf.icon"/>
        </div>


        <div class="text">
            <div style="text-align: center;font-size: 19px; font-weight: 600;width: 100%">{{conf.t1}}</div>
            <div style="text-align: center;font-size: 15px; width: 100%;height: 25px; height:25px; line-height: 25px;color: #68655f;margin-top: 12px">
                {{conf.t2}}
            </div>
            <div style="text-align: center;font-size: 15px; width: 100%;height: 25px; height:25px; line-height: 25px;color: #68655f">
                {{conf.t3}}
            </div>
        </div>
        <div class="info">


        </div>

    </div>

</template>

<script>
	export default {
		name: "youshi",
		props: {
			conf: {
				default: function () {
					return {}
				}
			}
		},
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
        width: 100%;
        background: #ffe5a7;
        position: relative;
    }

    .info {
        height: 400px;
        width: 100%;
        background: #F6F1ED;

    }

    .cont0 {
        height: 120px;
        width: 120px;
        border-radius: 120px;
        position: absolute;
        margin: auto;
        top: -110px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 101;

        text-align: center;
        line-height: 120px;
        font-size: 40px;
        color: #D89E4C;
        animation: namemf 2s linear infinite;
        -webkit-animation: namemf 2s linear infinite;
        -ms-animation: namemf 2s linear infinite;
    }

    .cont0:hover {
        animation: namemf 1s linear infinite;
        -webkit-animation: namemf 1s linear infinite;
        -ms-animation: namemf 1s linear infinite;

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

        text-align: center;
        line-height: 120px;
        font-size: 40px;
        color: #D89E4C;
    }

    @keyframes namemf {
        from {
            transform: rotate(0deg);
            border-bottom: 4px dotted #a6f90e;
            border-left: 4px dotted #a6f90e;
        }
        to {
            transform: rotate(360deg);
            border-bottom: 4px dotted #a6f90e;
            border-left: 4px dotted #a6f90e;
        }
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