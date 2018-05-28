<template>
    <div class="warp">
        <mytable :table-data="tableData" part="deployments"></mytable>
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
					modelName: "deployments"
				}
				this.$root.ax('/recon/check/console/dashboard/model/get', 'GET', sendData).then(r => {
					_this.tableData = [];
					//todo label app appVersion
					//todo pod running /current


					for (var x in r.data) {
						let o = {};
						o.name = r.data[x].name;
						o.labels = r.data[x].labels;
						o.pods = r.data[x].running + "/" + r.data[x].current;
						o.timestamp = r.data[x].timestamp;
						o.images = r.data[x].imageName;
						_this.tableData.push(o)
					}

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
        color: rgb(31, 45, 61);
        border-radius: 3px;
        box-shadow: rgb(219, 236, 172) 0px 0px 13px;
    }

</style>
