<template>
    <div class="warp">
        <div class="fg" :style="bg">
            <div class="tl">

                <div>
                    <pre class="title1">{{homeItem.t1}}</pre>
                </div>
                <div>
                    <pre class="title2">{{homeItem.t2}}</pre>
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
                               class="pan-btn pink-btn sel-btn" href="http://clzatz.wxzx88.com/pcpay/" target="_blank">登录</a>
                            <a @mouseover="animationText('formove',true)" @mouseout="animationText('formove',false)"
                               class="pan-btn pink-btn sel-btn" href="http://clzatz.wxzx88.com/#/register"
                               target="_blank">注册</a>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-text" :class="{hhh:formove1}">
                            五星在线期货策略
                        </div>
                        <div style="text-align: center" class="sel-btn0">
                            <a @mouseover="animationText('formove1',true)" @mouseout="animationText('formove1',false)"
                               class="pan-btn pink-btn sel-btn" href="http://qhzatz.wxzx88.com/pcpay/" target="_blank">登录</a>
                            <a @mouseover="animationText('formove1',true)" @mouseout="animationText('formove1',false)"
                               class="pan-btn pink-btn sel-btn" href="http://qhzatz.wxzx88.com/home/#/register"
                               target="_blank">注册</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <div class="inner-warp" style="margin-top: 15px">

            <div style="width: 400px; float: right">
                <pingtai-gonggao>

                </pingtai-gonggao>
            </div>
            <div style="margin-right: 410px; overflow: auto">
                <div style="height: 80px">
                    <self-title :cont="{t1:'财经资讯',t2:'带你领略业内最前沿的财经资讯',url:'1111'}">

                    </self-title>
                </div>
                <div style="width: 100%; padding: 6px">
                    <zixin-list :conf="zixunList">

                    </zixin-list>
                </div>

            </div>
        </div>
        <div class="inner-warp">
            <self-title :cont="{t1:'四大优势， 助您盈利',t2:'1分钟快速开户，界面简洁方便易上手，系统有严格的风控体系',url:''}">

            </self-title>
        </div>

        <div class="inner-warp" style="overflow: hidden;">
            <el-row :gutter="40">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <youshi :conf="{icon:'mengkan',t1:'超低门槛',t2:'最低1000元信用金',t3:'即可创建最高8000元A股策略'}"></youshi>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <youshi :conf="{icon:'gaoshouyi',t1:'超过收益',t2:'投资人出资金，按约买卖',t3:'盈利分成8成给你(秒到)'}"></youshi>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <youshi :conf="{icon:'fuwu',t1:'灵活方便',t2:'无需开户、选好股票',t3:'想买卖多少，一件提交'}"></youshi>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <youshi :conf="{icon:'jilv',t1:'养成纪律',t2:'严格按照策略止损止盈进行',t3:'交易、不再深套、保护利润'}"></youshi>
                    </div>
                </el-col>
            </el-row>
        </div>


        <div class="inner-warp" style="margin: 50px 0">
            <img :src="footStr" alt="" style="width: 100%">
        </div>


        <div class="inner-warp" style="text-align: center;font-size: 45px;font-weight: 500">
            合作伙伴

        </div>


        <div class="inner-warp" style="overflow: hidden;">
            <el-row :gutter="40">
                <el-col :span="4" v-for="(o,k) in hezuos" :key="k"
                        style="height: 80px; overflow: hidden; margin: 8px 0 ">
                    <img class="img-item" :src="o.image">
                </el-col>


            </el-row>
        </div>
    </div>
</template>

<script>
	import selfTitle from "../commponets/self_titel"
	import zixinList from "../commponets/zixin_list"
	import pingtaiGonggao from "../commponets/pingtai_gonggao"


	import youshi from "../commponets/youshi"

	import logo from "@/assets/images/logo.png"
	import footStr from "@/assets/images/footbg.png"


	export default {
		name: "index",
		components: {selfTitle, zixinList, pingtaiGonggao, youshi},
		data() {
			return {
				logo,
				formove: false,
				formove1: false,
				imgStr: '',
				footStr,
				bg: {
					// background: 'url(img/pho6.jpg)'
					background: ''
				},

				hezuos: [],
				zixunList: [],
                homeItem:{}
			}
		},
		methods: {
			animationText(t, s) {
				this[t] = s
			},

			loadBanner() {
				this.imgStr = '';
				this.$root.ax('/img/home', 'get', null).then(r => {
					this.bg.background = "url(" + process.env.BASE_API + "/" + r.data.data[0].url + ")" + " no-repeat";
					this.bg.backgroundSize = "100% 100%";
					this.homeItem =  r.data.data[0];
					console.log(this.imgStr)
				}, e => {
					console.log(e)
				})

			},

			loadHezuo() {
				this.imgStr = '';
				this.$root.ax('/img/hezuo', 'get', null).then(r => {
					this.hezuos = []
					for (let x in r.data.data) {
						let b = r.data.data[x];
						b.image = process.env.BASE_API + '/' + r.data.data[x].image
						this.hezuos.push(b)
					}
					console.log(this.hezuos)
				}, e => {
					console.log(e)
				})

			}
		},
		mounted() {
			this.loadBanner();
			this.loadHezuo();
			console.log(this.logo)
			this.$root.ax('/zixun/hot', 'get', null).then(r => {
				this.zixunList = []
				for (let x in r.data.data) {
					let b = r.data.data[x];
					b.image = process.env.BASE_API + '/' + r.data.data[x].image
					this.zixunList.push(b)
				}
				console.log(this.zixunList)
			}, e => {
				console.log(e)
			})

		},
		computed: {
			src() {
				return process.env.BASE_API + "/" + this.imgStr
			}
		}
	}
</script>

<style scoped>

    .title1 {
        font-size: 40px;
        text-align: center;
        font-weight: 600;
        color: #d1dbe5;
        position: relative;
        background-image: -webkit-linear-gradient(left, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-background-size: 200% 100%;
        -webkit-animation: masked-animation 8s infinite linear;
    }

    @-webkit-keyframes masked-animation {
        0% {
            background-position: 0 0;
        }
        10% {
            background-position: -100% 0;
        }
        20% {
            opacity: 1
        }
        25% {
            opacity: 0
        }
        30% {
            opacity: 1
        }
        35% {
            opacity: 0
        }
        40% {
            opacity: 1
        }
        50%{

            opacity: 0.6;
        }

        60%{

            opacity: 1;
            top: 0px;

        }
        70%{
            top: -50px;
        }


        75%{
            top: 40px;
        }

        80%{
            top: -50px;
        }

        85%{
            top: 30px;
        }

        90%{
            top: -50px;
        }

        95%{
            top: 20px;
        }

        100%{
            top: 0px;
        }
    }


    @-webkit-keyframes masked-animation1 {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: -100% 0;
        }

    }

    .title2 {
        font-size: 20px;
        text-align: center;
        color: #d1dbe5;
        background-image: -webkit-linear-gradient(left, #fffff2, #6a88ff 25%, #b1c1ff 50%, #fffff2 75%, #b1c1ff);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-background-size: 200% 100%;
        -webkit-animation: masked-animation1 8s infinite linear;
    }

    .warp {
        background: #f3f3f3;
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
        top: 265px;
    }

    .tl {
        height: 180px;
        width: 100%;
        position: absolute;
        top: 180px;
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

    .img-item {
        width: 100%;
        height: 100%
    }

    .img-item:hover {
        width: 101%;
        height: 101%;
    }

</style>