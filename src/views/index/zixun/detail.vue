<template>
    <div>
        <div style="height: 80px;background: #0b1018; border-top: 1px solid #8f8c86">

        </div>

        <div class="warp" style="font-size: 28px;font-weight: 500;color: #1f2d3d">
            {{conf.title}}
        </div>
        <div class="warp" style="font-size: 15px;color: #696460">
            {{conf.time}}
        </div>
        <div class="warp">
            <div>
                <img :src="conf.image" alt="" style="width: 100%">
            </div>

            <div style="white-space: pre-wrap; word-break: break-all;word-wrap: break-word;overflow: auto">
                {{conf.cont}}
            </div>

        </div>
    </div>
</template>

<script>
	export default {
		name: "detail",
		components: {},
		data() {
			return {
				conf: {}
			}
		},
		methods: {},
		mounted() {
			this.$root.ax(`/zixun/${this.$route.params.id}`, 'get', null).then(r => {
				this.conf = r.data.data[0]
				this.conf.image = process.env.BASE_API + '/' + this.conf.image;
				console.log(this.conf)
			}, e => {
				console.log(e)
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
    .warp {
        padding: 15px;
    }

</style>