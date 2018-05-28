<template>
    <div class="warp">
        <card part="service" :detail="detail"></card>
        <div style="height: 25px"></div>
        <mytable :table-data="tableData" part="pods" :base-url="baseUrl"></mytable>
    </div>
</template>

<script>
	import card from "./../componets/cards"
	import mytable from "../componets/talbels"

	export default {
		name: "info",
		components: {card, mytable},
		data() {
			return {
				detail: {},
				tableData: [],
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
					modelName: "service",
					modelDetailName: _this.$route.params.name
				}
				this.$root.ax("/recon/check/console/dashboard/model/detail/get", 'GET', sendData).then(r => {
					console.log('详情', r)
					this.detail = r.data;
					this.tableData = r.data.podList ? r.data.podList : []
				}, e => {
					console.log(e)
				})

			},

			madeUrl4moudel() {
				this.baseUrl = this.$route.path.replace('services/', '').replace(this.$route.params.name, '') + 'pods';
			}
		},
		mounted() {
			this.loadData()
			this.madeUrl4moudel()
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