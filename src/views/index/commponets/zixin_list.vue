<template>
    <div class="warp">

        <div class="item" v-for="(o,k) in conf">
            <div class="img">
                <img :src="o.image" style="width: 100%;height: 100%"/>
            </div>
            <div class="cont">
                <div class="cont-title">{{o.title}}</div>
                <div class="cont-text">
                    {{o.gaiyao}}
                </div>
                <div class="cont-foot">
                    {{o.time}}
                    <span class="btn" @click="goTo(o)">查看全文</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "zixin_list",
		props: {
			conf: {
				default: function () {
					return {}
				}
			}
		},
        methods:{
			goTo(o){
				this.$router.push({path: `/zixun/${o.id}`})

            }
        }
	}
</script>

<style scoped>
    .warp {
        box-shadow: 0 0 10px #a7a49e;
        padding: 10px;
    }

    .item {
        height: 100px;
        clear: both;
        overflow: hidden;
        margin: 5px 0;
        border-bottom: 1px solid #dedbd5;
    }

    .item:last-child {
        border-bottom: none;
    }

    .img {
        background: green;
        height: 100px;
        width: 150px;
        float: left;
    }

    .cont {
        height: 100px;
        margin-left: 150px;
        padding: 5px 15px;
    }

    .cont-text {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #a9adab;
        font-size: 13px
    }

    .cont-foot {
        color: #a9adab;
        font-size: 13px
    }

    .cont-title {
        overflow: hidden;
        height: 30px;
        font-size: 20px;
        line-height: 30px
    }

    .btn {
        float: right;
        padding: 3px 15px;
        background: none;
        border: 1px solid #d0d0d0;
        color: #FF0000;
        cursor: pointer;
    }

    .btn:hover {
        background: #FF0000;
        color: #ffffff;
        border: 1px solid #FF0000;
    }
</style>