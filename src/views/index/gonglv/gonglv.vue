<template>
    <div>
        <div style="height: 80px;background: #0b1018; border-top: 1px solid #8f8c86">

        </div>
        <div v-for="o in list" class="item"><img :src="o.image" alt="" width="100%"></div>

    </div>
</template>

<script>
	export default {
		name: "gonglv",
		components: {},
		data() {
			return {
				list:[]
            }
		},
		methods: {},
		mounted() {

			///img/gonglv

			this.$root.ax(`/img/gonglv`, 'get', null).then(r => {
				this.list = []
				console.log(r)
				this.totalPage = r.data.total-0;
				for (let x in r.data.data) {
					let b = r.data.data[x];
					b.image = process.env.BASE_API + '/' + r.data.data[x].image
					this.list.push(b)
				}
				console.log(this.list)
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
    .item, .item img{
        border: none;
        margin: 0;
        padding: 0;
    }


</style>