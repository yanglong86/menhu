<template>
    <div style="white-space: pre-wrap; word-break: break-all;word-wrap: break-word;overflow: auto">
        {{infoData.cont}}
    </div>
</template>

<script>
	export default {
		name: "zifei",
		components: {},
		data() {
			return {
				infoData: {}
			}
		},
		methods: {},
		mounted() {
			this.$root.ax('/pingtai/1/10/s', 'get', null).then(r => {
				console.log(r)
				this.infoData = r.data.data[0]
			}, e => {
			})
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