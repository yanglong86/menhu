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
				infoData: {
					cont: ''
				}
			}
		},
		methods: {},
		mounted() {
			this.$root.ax('/pingtai/1/10/f', 'get', null).then(r => {
				console.log(r)
				if (r.data.length > 0) {
					this.infoData = r.data[0]
				}
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