<template>
    <div class="warp">
        <div class="fg" :style="bg">
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
                               class="pan-btn pink-btn sel-btn" href="https://www.baidu.com" target="_blank">登录</a>
                            <a @mouseover="animationText('formove',true)" @mouseout="animationText('formove',false)"
                               class="pan-btn pink-btn sel-btn" href="https://www.baidu.com" target="_blank">注册</a>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-text" :class="{hhh:formove1}">
                            五星在线期货策略
                        </div>
                        <div style="text-align: center" class="sel-btn0">
                            <a @mouseover="animationText('formove1',true)" @mouseout="animationText('formove1',false)"
                               class="pan-btn pink-btn sel-btn" href="https://www.baidu.com" target="_blank">登录</a>
                            <a @mouseover="animationText('formove1',true)" @mouseout="animationText('formove1',false)"
                               class="pan-btn pink-btn sel-btn" href="https://www.baidu.com" target="_blank">注册</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="inner-warp">
            <self-title>

            </self-title>
        </div>

        <div class="inner-warp">
            <div style="width: 400px; float: right">
                <pingtai-gonggao>

                </pingtai-gonggao>
            </div>
            <div style="margin-right: 410px;">
                <zixin-list>

                </zixin-list>
            </div>
        </div>

    </div>
</template>

<script>
	import selfTitle from "../commponets/self_titel"
	import zixinList from "../commponets/zixin_list"
	import pingtaiGonggao from "../commponets/pingtai_gonggao"

	export default {
		name: "index",
		components: {selfTitle, zixinList, pingtaiGonggao},
		data() {
			return {
				formove: false,
				formove1: false,
				imgStr: '',
				bg: {
					// background: 'url(img/pho6.jpg)'
					background: '#ff0000'
				}
			}
		},
		methods: {
			animationText(t, s) {
				this[t] = s
			},

			loadBanner() {
				this.imgStr = '';
				this.$root.ax('/img/home', 'get', null).then(r => {
					this.bg.background = "url(" + process.env.BASE_API + "/" + r.data[0].url + ")" + " no-repeat";
					this.bg.backgroundSize = "100% 100%";
					console.log(this.imgStr)
				}, e => {
					console.log(e)
				})

			}
		},
		mounted() {
			this.loadBanner();
		},
		computed: {
			src() {
				return process.env.BASE_API + "/" + this.imgStr
			}
		}
	}
</script>

<style scoped>
    .warp {
        background: #ffffff;
        overflow: hidden;
    }

    .fg {
        height: 600px;
    }

    .inner-warp {
        padding: 15px;
        overflow: auto;
    }

    .text {
        height: 300px;
        position: relative;
        top: 182px;
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
        background-color: rgba(0, 0, 0, 0.2);
        height: 80px;
        line-height: 80px;
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