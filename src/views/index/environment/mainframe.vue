<template>
    <div class="warp">
		<div class="add-btn">
			<el-button type="primary" size="small" @click="addHost">添加主机</el-button>
		</div>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="4"  v-for="item in cardList" :key="item.id" class="clearfix">
                <card :key="item.id" :model="item"></card>
            </el-col>
        </el-row>
    </div>

</template>

<script>
	import card from "../common/mainframe_card"

	export default {
		name: "mainframe",
		components: {card},
		data() {
			return {
				cardList: []
			}
		},
		methods: {
			//加载主机
			loadList() {
				this.$root.ax(`/recon/check/console/rancher/host/get/${this.$route.params.id}`, "GET", null).then(r => {
					console.log(r.data)
					this.cardList = r.data;
				}, e => {
					console.log(e.message)
				})
			},
			// 新增主机
			addHost(){
				this.$router.push(`/addhost/${this.$route.params.id}`);	
			}
		},
		mounted() {
			//this.$route.params.id
            console.log(this.$route.params.id)
			this.loadList()

		},
		watch: {},
		created() {
			let _this = this;
			this.$root.bus.$on('_loadCard',r=> {
				_this.loadList();
			})
		},
		destroyed() {
		}
	}
</script>

<style scoped>
    .warp{
        padding: 0 21px 0 0;
    }
	.add-btn{
		padding-top: 10px;
		text-align: right;
		margin-right: -26px;
		margin-bottom: 10px
	}


</style>