<template>
    <div class="warp">
        <div class="title">
            {{cont.t1}}
        </div>

        <div class="text">
            <div class="moer" v-if="cont.url">更多
                <svg-icon icon-class="moer"/>
            </div>
            <div style="margin-right: 90px;">{{cont.t2}}</div>

        </div>

    </div>
</template>

<script>
	export default {
		name: "self_titel",
		components: {},
        props:{
	        cont:{
				default:{}
            }
        },
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
    .moer {
        width: 90px;
        float: right;
        text-align: right;
    }

    .moer:hover {
        color: #2d2f33;
        cursor: pointer;

    }

    .warp {
        border-left: 4px solid #ac0003;
        height: 60px;
        padding: 0 10px;
    }

    .warp .title {
        height: 40px;
        font-size: 25px;
        color: #ac0003;
        transition: border-bottom 2s;
    }

    .warp .text {
        height: 20px;
        line-height: 25px;
        color: #a7a49e;
        clear: both;
        overflow: hidden;
    }

    .title:after {
        content: '';
        position: relative;
        bottom: -7px;
        right: 0;
        display: block;
        background: #d4d1ca;
        width: 0;
        height: 1px;
        left: -1px;
        animation: clipMe 12s ease infinite;
        animation-direction: alternate;

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