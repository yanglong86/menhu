<template>
    <div class="warp">
        <card part="deployments" :detail="detail"></card>
        <div style="height: 30px"></div>
        <mytable :table-data="tableDataCli" part="replicaset" :base-url="baseUrl"></mytable>
    </div>
</template>

<script>
	import card from "./../componets/cards"
	import mytable from "../componets/talbels"

	export default {
		name: "info",
		components: {card,mytable},
		data() {
			return {
				detail:{
                },
				tableDataCli:[],
				baseUrl: ""
            }
		},
		methods: {
			loadData() {
				let _this = this;
				console.log('scd')
				console.log(this.$route)
				let sendData = {
					templateId: _this.$route.params.id,
					namespace: _this.$route.query.namespace,
					modelName: "deployments",
					modelDetailName: _this.$route.params.name
				}
				this.$root.ax("/recon/check/console/dashboard/model/detail/get", 'GET', sendData).then(r => {
					console.log('详情', r)
					_this.detail = r.data;
					let bufferObj = {
						name: r.data.newReplicaSet.name,
						labels: r.data.newReplicaSet.labels,
						pods: r.data.newReplicaSet.running + "/" + r.data.newReplicaSet.current,
						created: r.data.newReplicaSet.timestamp,
						images: r.data.newReplicaSet.imageName,
					}
					_this.tableDataCli.push(bufferObj)

				}, e => {
					console.log(e)
				})

			},
			madeUrl4moudel() {
				this.baseUrl = this.$route.path.replace('deployments/', '').replace(this.$route.params.name, '') + 'replicaset';
			}
        },
		mounted() {
			this.loadData();
			this.madeUrl4moudel();
		},
		watch: {},
		created() {
		},
		destroyed() {
		}
	}
</script>

<style scoped>
    .warp{
        padding: 10px;
    }

</style>