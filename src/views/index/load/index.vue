<template>
    <div>
        <div style="height: 80px;background: #0b1018; border-top: 1px solid #8f8c86">

        </div>
        <div style="position: relative">
            <img :src="bgg" style="width: 100%"/>
            <div style="width: 250px; height: 350px; background: #ffffff;position: absolute; top: 20%; right: 14%;z-index: 100">

                <div style="padding: 15px;width: 250px;height: 250px">
                    <img :src="ewm" style="width: 100%"/>
                </div>
                <div style="width: 250px;height: 30px; line-height: 30px; text-align: center;color: #787974">
                    手机扫描二维码下载
                </div>
                <div style="width: 250px;height: 60px; line-height: 30px; text-align: center;color: #787974">

                    <span class="up-btn">立即下载 <svg-icon icon-class="xiazai"/></span>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import bgg from "@/assets/images/bgg.png"
	import ewm from "@/assets/images/erweima.png"

	export default {
		name: "index",
		data() {
			return {
				bgg,
				ewm
			}
		}
	}
</script>

<style scoped>
    .up-btn{
        padding: 15px 38px;
        background: #00b38f;
        border-radius: 25px;
        line-height: 50px;
        color: #ffffff;
        cursor: pointer;
    }

    .up-btn:hover{
        background: #00c7a0;
    }

</style>