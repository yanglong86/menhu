<template>
    <div style="padding: 40px">
        <div style="font-size: 24px; font-weight: 500;padding: 25px 0 10px 0">联系电话</div>
        <div style="font-size: 20px; font-weight: 500; color:#9f9f9f">{{about.phone}}</div>
        <div style="font-size: 24px; font-weight: 500; padding: 25px 0 10px 0">工作时间</div>
        <div style="font-size: 20px; font-weight: 500; color:#9f9f9f ">周一至周五（{{about.worktime}}）</div>
    </div>
</template>

<script>
	export default {
		name: "aboutme",
		components: {},
		data() {
			return {
				about: {}
			}
		},
		methods: {},
		mounted() {

			this.$root.ax("aboutme", "get", null).then(r => {
				this.about = r.data[0];
				console.log(this.about)

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