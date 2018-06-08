<template>
    <div>
        <div style="height: 80px;background: #0b1018; border-top: 1px solid #8f8c86">

        </div>
        <div class="main">
            <div class="left">
                <div class="menu">
                    <div class="list" :class="{active: current == '关于我们'}">
                        <a href="#/aboutme/aboutme" @click="goToItem('关于我们')">关于我们</a>
                    </div>
                    <div class="list" :class="{active: current == '收费标准'}">
                        <a href="#/aboutme/zifei" @click="goToItem('收费标准')">收费标准</a>
                    </div>
                    <div class="list" :class="{active: current == '资金相关'}">
                        <a href="#/aboutme/zijing" @click="goToItem('资金相关')">资金相关</a>
                    </div>

                    <div class="list" :class="{active: current == '风控规则'}">
                        <a href="#/aboutme/fenkong" @click="goToItem('风控规则')">风控规则</a>
                    </div>

                    <div class="list" :class="{active: current == '平台公告'}">
                        <a href="#/aboutme/gonggao" @click="goToItem('平台公告')">平台公告</a>
                    </div>

                    <div class="list" :class="{active: current == '联系我们'}">
                        <a href="#/aboutme/linkme" @click="goToItem('联系我们')">联系我们</a>
                    </div>
                </div>

            </div>
            <div class="right">
                <div class="text">
                    <div class="title">{{current}}</div>
                    <div style="padding: 50px 5px">
                        <router-view></router-view>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				current: '关于我们'
			}

		},
		methods: {
			goToItem(item) {
				this.current = item;

			}
		},
		mounted() {
			console.log(this.$route)
			this.current = this.$route.name;
		}
	}
</script>

<style scoped>
    .main {

        background: #e9e9e9;
        overflow: auto;
    }

    .left {
        width: 250px;
        height: 600px;
        padding: 30px;
        float: left;
    }

    .menu {
        width: 100%;
        height: 200px;
        text-align: center;
    }

    .list {
        height: 45px;
        line-height: 45px;
        background: #ffffff;
        margin: 5px 0;
        font-size: 18px;
        font-weight: 500;
        color: #8a8a8a;
        border-left: 4px solid #ffffff;
        cursor: pointer;
    }

    .list:hover {
        color: #1d1d1d;
        border-left: 4px solid #f91536;
    }

    .list.active {
        color: #1d1d1d;
        border-left: 4px solid #f91536;
    }

    .list a {
        display: block;
    }

    .right {
        margin-left: 250px;
        margin-right: 20px;
        overflow: hidden;
        position: relative;
    }

    .text {
        border: 1px solid #f3f3f3;
        padding: 5px;
        margin: 38px 0 0 0;
        background: #ffffff;
    }

    .title {
        height: 60px;
        line-height: 60px;
        padding: 0 15px;
        font-size: 22px;
        font-weight: 500;
        border-bottom: 1px solid #f91536;
    }

</style>