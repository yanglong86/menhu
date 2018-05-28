<template>
    <div>
        <div class="warp">
            <mytable :table-data="tableData" part="service"></mytable>
        </div>
    </div>
</template>

<script>
	import cpu from "../componets/charts_cpu"
	import memory from "../componets/charts_memory"
	import mytable from "../componets/talbels"


	export default {
		name: "index",
		components: {cpu, memory, mytable},
		data() {
			return {
				tableData: []
			}
		},
		methods: {
			loadData() {
				let _this = this;
				let sendData = {
					templateId: _this.$route.params.id,
					namespace: _this.$route.query.namespace,
					modelName: "service"
				}
				this.$root.ax('/recon/check/console/dashboard/model/get', 'GET', sendData).then(r => {

					_this.tableData = r.data;
					console.log(1111111)
					console.log(r.data)

				}, e => {
					_this.$message.error(e.message)
				})

			}

		},
		mounted() {
			this.loadData();

		},
		watch: {},
		created() {
			var _this = this;


		},
		destroyed() {

		}
	}
</script>

<style scoped>
    .warp {
        padding: 10px;
    }


</style>
