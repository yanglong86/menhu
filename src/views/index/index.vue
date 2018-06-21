<template>
    <div style="height: 100%">
        <el-scrollbar style="height: 100%">
            <div class="top">
                <div style="float: left">欢迎来到五星在线： {{about.web}}</div>
                <div style="float: right">客服热线：&nbsp; {{about.phone}}</div>
            </div>
            <div class="nav">
                <div class="left"><img :src="logo" alt="" style="width: 430px; padding: 12px;"></div>
                <div class="right">
                <span><a href="#/">首页</a>
                    <div class="line"></div>
                </span>
                    <span><a href="#/aboutme">关于我们</a>
                <div class="line"></div></span>
                    <span>
                        <a href="#/gonglv">新手攻略</a>
                <div class="line"></div></span>
                    <span>
                        <a href="#/zixun">财经资讯</a>
                <div class="line"></div></span>

                    <span>
                                              <a href="#/load">客户端下载</a>
                <div class="line"></div></span>

                </div>
            </div>
            <router-view></router-view>
            <div class="foot">
                <div class="foot-left">

                    <div style="height: 150px;font-size: 25px;line-height: 150px">
                        关于我们
                    </div>

                    <div style="height: 50px;font-size: 13px;line-height: 50px">
                        近在咫尺的市场，触手可及的机遇
                    </div>

                    <div style="height: 50px;font-size: 13px;line-height: 50px">
                        投资有风险 &nbsp;&nbsp; 入市需谨慎
                    </div>

                    <div style="height: 50px;font-size: 13px;line-height: 50px">
                        中安（广州）投资控股有限公司
                        <span style="padding: 0 15px; color: #37bcff">
                        粤ICP备17120658号-2
                    </span>
                    </div>
                </div>

                <div class="foot-right">
                    <div style="height: 140px; width: 140px; line-height: 210px; text-align:center ">微信扫一扫</div>
                    <div><img :src="ewm" alt=""></div>
                </div>
                <div class="foot-center">
                    <div style="height: 150px;font-size: 25px;line-height: 150px">

                    </div>

                    <div style="height: 50px;font-size: 13px;line-height: 50px">
                        招商加盟：&nbsp;&nbsp;<span style="font-size: 16px">{{about.phone}}</span>（工作日{{about.worktime}}）
                    </div>

                    <div style="height: 50px;font-size: 13px;line-height: 50px">
                        网 址： &nbsp;&nbsp;{{about.web}}
                    </div>

                    <div style="height: 50px;font-size: 13px;line-height: 50px">
                        五星在线期待你的加盟， 金融界新时代的创富机会

                    </div>
                </div>

            </div>
        </el-scrollbar>
    </div>
</template>

<script>
	import logo from "@/assets/images/logo.png"
	import ewm from "@/assets/images/ewm.png"

	export default {
		name: "index",
		components: {},
		data() {
			return {
				logo,
				ewm,
				about: {}
			}
		},
		methods: {},
		mounted() {
			console.log(this.logo)
			this.$root.ax("aboutme", "get", null).then(r => {
				this.about = r.data.data[0];
				console.log(this.about)

			}, e => {
			})
		},
		watch: {},
		created() {
		},
		destroyed() {
		}
	}
</script>

<style scoped>
    .top {
        height: 40px;
        line-height: 40px;
        background: #0b1018;
        color: #c4c4c4;
        padding: 0 20px;
    }

    .nav {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        height: 80px;
        line-height: 80px;
        position: absolute;

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
        width: 100%;
    }

    .foot {
        height: 350px;
        background: #080808;
        color: #d4e8ff;
        padding: 0 15px;
    }

    .foot-left {
        width: 400px;
        height: 350px;
        float: left;

    }

    .foot-right {
        width: 180px;
        height: 350px;
        float: right;
    }

    .foot-center {
        height: 350px;
        text-align: right;
        padding: 0 210px;
    }

</style>
