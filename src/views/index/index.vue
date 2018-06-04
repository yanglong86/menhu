<template>
    <div>
        <div class="top">
            <div style="float: left">欢迎来到五星在线： {{about.web}}</div>
            <div style="float: right">{{about.worktime}}</div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>


	export default {
		name: "index",
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
    .top {
        height: 40px;
        line-height: 40px;
        background: #0b1018;
        color: #c4c4c4;
        padding: 0 20px;
    }

</style>
