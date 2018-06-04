<template>
    <div class="warp">
        <div class="cont">

        </div>
        <div class="info">

            1111
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
        height: 300px;
        width: 300px;
        background: #598ce5;
        position: relative;
    }

    .info {
        height: 300px;
        width: 300px;
        background: green;


    }

    .cont {
        background: #8a6d3b;
        height: 100px;
        width: 100px;
        border-radius: 50px;
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
    }

    .info:hover {
        animation: myfirst 8s ease-in-out;
        -webkit-animation: myfirst 8s ease-in-out; /* Safari and Chrome */
        animation-direction: alternate;
    }

    @keyframes myfirst {
        0% {
            transform: rotateY(0);
            background: green;

        }

        50% {
            transform: rotateY(360deg);
            background: #ac0003;
        }

        100% {
            transform: rotateY(0deg);
            background: green;
        }
    }

</style>