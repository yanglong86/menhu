<template>
    <div class="warp">
        <div class="title">平台公告</div>
        <div class="body">
            <div class="list" v-for="(o,k) in list" :key="k" @click="spellcheck(o)">{{o.title}}</div>
            <div class="page">
                <el-pagination
                        small
                        layout="prev, pager, next"
                        :total="totalPage"
                        @current-change="handler">
                </el-pagination>
            </div>

        </div>

        <el-dialog
                :title="currentCont.title"
                :visible.sync="dialogVisible"
                width="30%">
            <span style="white-space: pre-wrap; word-break: break-all;word-wrap: break-word;overflow: auto">{{currentCont.cont}}</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">关闭</el-button>
          </span>
                </el-dialog>
    </div>
</template>

<script>
	export default {
		name: "pingtai_gonggao",
		data() {
			return {
				list: [],
				current: 1,
				totalPage: 0,
				currentCont: '',
				dialogVisible:false
			}
		},
		methods: {
			loadList() {
				// /pingtai/1/10/p

				this.$root.ax(`/pingtai/${this.current}/10/p`, 'get', null).then(r => {
					this.list = r.data.data;
					this.totalPage = r.data.total;

				}, e => {
					console.log(e)
				})
			},
			handler(val) {
				console.log(val)
				this.current = val;
			},
			spellcheck(item) {
				this.dialogVisible = true;
				this.currentCont = item;
				console.log(this.currentCont)
			}
		},
		mounted() {
			this.loadList();
		}
	}
</script>

<style scoped>
    .warp {
        box-shadow: 0 0 10px #a7a49e;
        height: 528px;
    }

    .title {
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        font-size: 20px;
        font-weight: 500;
        background: #e4e4e4;
        color: #606266;
    }

    .body {
        padding: 15px;
    }

    .list {
        height: 38px;
        line-height: 38px;
        border-bottom: 1px #9f9f9f dotted;
        color: #666666;
        cursor: pointer;
    }

    .list:hover {
        color: #E65D6E;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .page {
        padding: 20px 0;
    }

</style>