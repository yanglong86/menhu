<template>
    <div class="warp">

        <div class="item">
            <div class="img">
            </div>
            <div class="cont">
                <div class="cont-title">中国股份</div>
                <div class="cont-text">
                    中国股份中国股份中国股份中国股份中国股份中国股份中国股份中国
                </div>
                <div class="cont-foot">
                    2017-08-09 23:22:44
                    <span class="btn">查看全文</span>
                </div>
            </div>
        </div>

        <div class="item">
            <div class="img">
            </div>
            <div class="cont">
                <div class="cont-title">中国股份</div>
                <div class="cont-text">
                    中国股份中国股份中国股份中国股份中国股份中国股份中国股份中国
                </div>
                <div class="cont-foot">
                    2017-08-09 23:22:44
                    <span class="btn">查看全文</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
	export default {
		name: "zixin_list"
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

    .item:last-child{
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

    .btn{
        float: right;
        padding: 3px 15px;
        background: none;
        border: 1px solid #d0d0d0;
        color: #FF0000;
        cursor: pointer;
    }

    .btn:hover{
        background: #FF0000;
        color: #ffffff;
        border: 1px  solid #FF0000;
    }
</style>