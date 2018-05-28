<template>
    <div class="shark">
        <div class="title">details</div>
        <div class="info">
            <el-row>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" style="padding: 8px 15px;"
                        v-for="(item, k) in o" :key="k">
                    <div v-if="!item.list">
                        <div style="width: 180px; float: left; font-weight: 600; font-size: 13px">{{item.label}}:</div>
                        <div style="margin-left: 150px;font-size: 13px">{{detail[item.prop]}}</div>
                    </div>
                    <div v-if="item.list">
                        <div style="width: 180px; float: left; font-weight: 600; font-size: 13px">{{item.label}}:</div>
                        <ul style="margin-left: 150px;font-size: 13px">
                            <li v-for="(o, k) in detail[item.prop]" :key="k">
                                {{o}}
                            </li>
                        </ul>
                    </div>

                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
	import * as cardsObj from "./../cards_model.js"

	export default {
		name: "cards",
		props: {
			part: {
				default: "pods"
			},
			detail: {
				default: function () {
					return {};
				}
			}
		},
		components: {},
		data() {
			return {
				o: []
			}
		},
		methods: {
			// loadData() {
			// 	let _this = this;
			// 	console.log('scd')
			// 	console.log(this.$route)
			// 	let sendData = {
			// 		templateId: _this.$route.params.id,
			// 		namespace: _this.$route.query.namespace,
			// 		modelName: _this.part,
			// 		modelDetailName: _this.$route.params.name
			// 	}
			// 	this.$root.ax("/recon/check/console/dashboard/model/detail/get", 'GET', sendData).then(r => {
			// 		console.log('详情', r)
			// 		this.detail = r.data;
			// 		this.detail.labels = this.detail.labels.app + "  " + this.detail.labels.version;
			// 		this.detail.selector = this.detail.selector.app + "  " + this.detail.selector.version;
			//
			//
			// 	}, e => {
			// 		console.log(e)
			// 	})
			//
			// }
		},
		mounted() {
			this.o = cardsObj[this.part];
			// this.loadData()
		},
		watch: {},
		created() {
		},
		destroyed() {
		}
	}
</script>

<style scoped>
    .title {
        height: 40px;
        line-height: 40px;
        background: #ffffff;
        padding: 0 8px;
        font-weight: 600;
        border-bottom: 1px solid #e4e4e4;
    }

    .shark {
        background: rgb(255, 255, 255);
        color: rgb(31, 45, 61);
        border-radius: 3px;
        box-shadow: rgb(219, 236, 172) 0px 0px 13px;
    }

    .info {
        padding: 15px 0;
    }

</style>