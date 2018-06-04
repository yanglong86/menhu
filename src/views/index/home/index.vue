<template>
    <div class="warp">
        <div class="nav">
            <div class="left">2222</div>
            <div class="right">
                <span>首页
                    <div class="line"></div>
                </span>
                <span>开始
                <div class="line"></div></span>
                <span>结束
                <div class="line"></div></span>
            </div>
        </div>

        <div class="text">
            <div class="inner-text">
                <div class="item">
                    <div class="item-text" :class="{hhh:formove}">
                        五星在线策略
                    </div>
                    <div style="text-align: center" class="sel-btn0">
                        <a @mouseover="animationText('formove',true)" @mouseout="animationText('formove',false)"
                           class="pan-btn pink-btn sel-btn" href="https://www.baidu.com" target="_blank">Form</a>
                        <a @mouseover="animationText('formove',true)" @mouseout="animationText('formove',false)"
                           class="pan-btn pink-btn sel-btn" href="https://www.baidu.com" target="_blank">Form</a>
                    </div>
                </div>
                <div class="item">
                    <div class="item-text" :class="{hhh:formove1}">
                        五星在线期货策略
                    </div>
                    <div style="text-align: center" class="sel-btn0">
                        <a @mouseover="animationText('formove1',true)" @mouseout="animationText('formove1',false)"
                           class="pan-btn pink-btn sel-btn" href="https://www.baidu.com" target="_blank">Form</a>
                        <a @mouseover="animationText('formove1',true)" @mouseout="animationText('formove1',false)"
                           class="pan-btn pink-btn sel-btn" href="https://www.baidu.com" target="_blank">Form</a>
                    </div>

                </div>
            </div>
        </div>
        <self-title></self-title>
        <youshi></youshi>
    </div>
</template>

<script>
    import selfTitle from "../commponets/self_titel"


    import youshi from "../commponets/youshi"


	export default {
		name: "index",
        components:{selfTitle,youshi},
		data() {
			return {
				formove: false,
				formove1: false
			}
		},
		methods: {
			animationText(t, s) {
				this[t] = s
			}
		}
	}
</script>

<style scoped>
    .warp {
        height: 800px;
        background: #f3f3f3;
        overflow: hidden;
    }

    .text {
        height: 300px;
        background: #d4e8ff;
        position: relative;
    }

    .inner-text .item {
        display: inline-block;
        vertical-align: bottom;
        width: 295px;
        height: 100%;
    }

    .item-text {
        height: 50px;
        line-height: 50px;
        font-size: 28px;
        color: #fff;
        text-align: center;
        transform: rotate(0deg);

    }

    .inner-text {
        height: 100px;
        width: 600px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    .hhh {
        animation: myfirst 0.2s;
        -webkit-animation: myfirst 0.2s; /* Safari and Chrome */
    }

    @keyframes myfirst {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(6deg);
        }
        50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(-6deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    @-webkit-keyframes myfirst /* Safari and Chrome */
    {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(6deg);
        }
        50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(-6deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    .nav {
        background: green;
        background-color: rgba(0, 128, 0, 0.2);
        height: 100px;
        line-height: 100px;
    }

    .left {
        width: 400px;
        float: left;
    }

    .right {
        margin-left: 400px;
        text-align: right;
    }

    .right span {
        display: inline-block;
        color: #ffffff;
        font-size: 18px;
        margin: 0 20px;
        position: relative;
        cursor: pointer;
    }

    .line {
        width: 0px;
        height: 5px;
        border-radius: 5px;
        background-color: #fff;
        margin: 0 auto;
        position: absolute;
        top: 70px;
        left: 0px;
        right: 0px;
        transition: width 0.3s linear;
    }

    .right span:hover .line {
        width: 30px;
    }
</style>