<template>
    <div>
        <div class="warp">
            <mytable :table-data="tableData00" part="deployments"></mytable>
            <div style="height: 30px"></div>
            <mytable :table-data="tableData11" part="pods"></mytable>
            <div style="height: 30px"></div>
            <mytable :table-data="tableData22" part="replicaset"></mytable>
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
				tableData00: [],
				tableData11: [],
				tableData22: [],
			}
		},
		methods: {

			loadData00() {
				let _this = this;
				let sendData = {
					templateId: _this.$route.params.id,
					namespace: _this.$route.query.namespace,
					modelName: "deployments"
				}
				this.$root.ax('/recon/check/console/dashboard/model/get', 'GET', sendData).then(r => {
					_this.tableData00 = [];
					//todo label app appVersion
					//todo pod running /current
					for (var x in r.data) {
						let o = {};
						o.name = r.data[x].name;
						o.labels = r.data[x].labels;
						o.pods = r.data[x].running + "/" + r.data[x].current;
						o.timestamp = r.data[x].timestamp;
						o.images = r.data[x].imageName;
						_this.tableData00.push(o)
					}

				}, e => {
					_this.$message.error(e.message)
				})

			},
			loadData11() {
				let _this = this;
				let sendData = {
					templateId: _this.$route.params.id,
					namespace: _this.$route.query.namespace,
					modelName: "pods"
				}
				this.$root.ax('/recon/check/console/dashboard/model/get', 'GET', sendData).then(r => {
					_this.tableData11 = r.data;
				}, e => {
					_this.$message.error(e.message)
				})

			},
			loadData22() {
				let _this = this;
				let sendData = {
					templateId: _this.$route.params.id,
					namespace: _this.$route.query.namespace,
					modelName: "replicaset"
				}
				this.$root.ax('/recon/check/console/dashboard/model/get', 'GET', sendData).then(r => {
					_this.tableData22 = [];
					for (let i = 0; i < r.data.length; i++) {
						let bufferObj = {
							name: r.data[i].name,
							labels: r.data[i].labels,
							pods: r.data[i].running + "/" + r.data[i].current,
							created: r.data[i].timestamp,
							images: r.data[i].imageName,
						}
						_this.tableData22.push(bufferObj);
					}
				}, e => {
					_this.$message.error(e.message)
				})

			}

		},
		mounted() {
			this.loadData11();
			this.loadData00();
			this.loadData22();
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
