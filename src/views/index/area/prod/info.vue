<template>
    <div class="warp">
        <card part="pods" :detail="detail"></card>
    </div>
</template>

<script>
	import card from "./../componets/cards"

	export default {
		name: "info",
		components: {card},
		data() {
			return {
				detail: {}
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
					modelName: "pods",
					modelDetailName: _this.$route.params.name
				}
				this.$root.ax("/recon/check/console/dashboard/model/detail/get", 'GET', sendData).then(r => {
					console.log('详情', r)
					this.detail = r.data;
					// this.detail.labels = this.detail.labels.app + " " + " " + "  "
					// 	+ this.detail.labels['pod-template-hash'] + "  " + "  " + " "
					// 	+ this.detail.labels.version;

					// var str = "";
					// for (let x in this.detail.annotation) {
					// 	str = x +" "+ this.detail.annotation[x];
					// }
                    //
					// this.detail.annotation = str
				}, e => {
					console.log(e)
				})

			}
		},
		mounted() {
			this.loadData()
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