<template>
    <div>
        <el-row v-if="showTu">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="padding: 15px">
                <cpu id="cupChart" :key="key"></cpu>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="padding: 15px">
                <memory id="memoryChart" :key="key"></memory>
            </el-col>
        </el-row>
        <router-view :key="key"></router-view>
    </div>
</template>

<script>
	import cpu from "./componets/charts_cpu"
	import memory from "./componets/charts_memory"
	export default {
		name: "index",
		components: {cpu,memory},
		data() {
			return {
				showTu:true
            }
		},
		methods: {},
		mounted() {
			console.log('fdgdghh')
			console.log(this.$route)

			let bufferArr = this.$route.path.split('/');
			if (bufferArr.length < 3) {
				this.showTu = true;
			}else{
				if(bufferArr[3] === 'services'){
					this.showTu = false;
                }else {
					this.showTu = true;
                }


            }
		},
		computed: {
			key() {
				return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
			}
		},
		watch: {},
		created() {
		},
		destroyed() {
		}
	}
</script>

<style scoped>

</style>