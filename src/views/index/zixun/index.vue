<template>
    <div class="warp">
        <div style="height: 80px;background: #0b1018; border-top: 1px solid #8f8c86">

        </div>
        <div>
            <zixin-list :conf="zixunList">

            </zixin-list>
        </div>
        <div style="height: 100px; padding: 30px 15px; text-align: right">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 50, 100]"
                    :page-size="currentSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
	import zixinList from "../commponets/zixin_list"
	export default {
		name: "index",
		components: {zixinList},
		data() {
			return {
				zixunList : [],
				currentPage: 1,
				currentSize: 10,
                totalPage:0
            }
		},
		methods: {
			handleSizeChange(val) {
				this.currentSize= val;
				this.loadList();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.loadList();
			},

            loadList(){
				this.$root.ax(`/zixun/${this.currentPage}/${this.currentSize}`, 'get', null).then(r => {
					this.zixunList = []
                    console.log(r)
                    this.totalPage = r.data.total-0;
					for (let x in r.data.data) {
						let b = r.data.data[x];
						b.image = process.env.BASE_API + '/' + r.data.data[x].image
						this.zixunList.push(b)
					}
					console.log(this.zixunList)
				}, e => {
					console.log(e)
				})
            }
        },
		mounted() {
            this.loadList()
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