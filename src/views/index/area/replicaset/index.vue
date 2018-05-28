<template>
    <div>
        <div class="warp">
            <mytable :table-data="tableData" part="replicaset"></mytable>
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
					modelName: "replicaset"
				}
				this.$root.ax('/recon/check/console/dashboard/model/get', 'GET', sendData).then(r => {

					_this.tableData = [];
					for (let i = 0; i < r.data.length; i++) {
						let bufferObj = {
							name: r.data[i].name,
							labels: r.data[i].labels,
							pods: r.data[i].running + "/" + r.data[i].current,
							created: r.data[i].timestamp,
							images: r.data[i].imageName,
						}
						_this.tableData.push(bufferObj);
					}
					//_this.tableData = r.data;
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
