<template>
    <div class="warp">
        <card part="replicaset" :detail="detail"></card>
        <div style="height: 25px"></div>
        <mytable :table-data="tableDatasv" part="service" :base-url="baseUrlsv"></mytable>
        <div style="height: 25px"></div>
        <mytable :table-data="tableDatapd" part="pods" :base-url="baseUrlpd"></mytable>
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
				detail: {},
				baseUrlsv:'',
				baseUrlpd:'',
				tableDatasv: [],
				tableDatapd: []
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
					modelName: "replicaset",
					modelDetailName: _this.$route.params.name
				}
				this.$root.ax("/recon/check/console/dashboard/model/detail/get", 'GET', sendData).then(r => {
					console.log('详情', r)
					this.detail = r.data;
					this.tableDatasv = r.data.servicesList;
					this.tableDatapd = r.data.podList;
				}, e => {
					console.log(e)
				})

			},
			madeUrl4moudel() {
				this.baseUrlsv = this.$route.path.replace('replicaset/', '').replace(this.$route.params.name, '') + 'services';
				this.baseUrlpd = this.$route.path.replace('replicaset/', '').replace(this.$route.params.name, '') + 'pods';
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
    .warp {
        padding: 10px;
    }

</style>