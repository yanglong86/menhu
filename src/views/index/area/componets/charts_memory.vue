<template>
    <div class="shark">
        <div :class="className" :id="id" :style="{height:height,width:'auto'}"></div>
    </div>
</template>

<script>
	import echarts from 'echarts'

	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			id: {
				type: String,
				default: 'chart03'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '250px'
			}
		},
		data() {
			return {
				chart: null,
				option: {
					backgroundColor: '#FFFFFF',
					title: {
						text: 'Memory usage'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [
						{
							type: 'category',
							boundaryGap: false,
							data: []
						}
					],
					yAxis: [
						{
							type: 'value',
							name: '单位（Gib）',
						}
					],
					series: [
						{
							name: '内存使用',
							type: 'line',
							stack: '使用',
							areaStyle: {normal: {}},
							data: []
						}
					],
					color: ['#598ce5']
				}
			}
		},
		mounted() {
			console.log("dfddd")
			var _this = this;
			this.initChart();
			this.loadData();


		},
		beforeDestroy() {


		},
		methods: {
			initChart() {
				this.chart = echarts.init(document.getElementById(this.id))
			},

			loadData() {
				let _this = this;
				console.log('scd')
				console.log(this.$route)
				let sendData = {
					templateId: _this.$route.params.id,
					namespace: _this.$route.query.namespace,
					modelName: _this.$route.query.mod ? _this.$route.query.mod : 'deployments',
					modelDetailName: _this.$route.params.name ? _this.$route.params.name : ""
				}
				this.$root.ax("/recon/check/console/dashboard/workloads/get", 'GET', sendData).then(r => {
					console.log('memory折线图', r)
					let memoryArr = r.data.memoryList, y = [], x = [];
					for (let key in memoryArr) {
						y.push(memoryArr[key])
						x.push(new Date(key + "000" - 0).getMinutes() + ":" + new Date(key + "000" - 0).getSeconds())
					}
					_this.option.xAxis[0].data = x;
					_this.option.series[0].data = y;
					_this.chart.setOption(_this.option);
				}, e => {
					console.log(e)
				})

			}

		},
		created() {
			var _this = this;
			// this.$root.bus.$on("_areaData99", r => {
			// 	console.log("接收广播")
			// 	console.log(r)
			// 	_this.option.xAxis[0].data = [];
			// 	_this.option.series[0].data = [];
			// 	for (var x in r.memoryList) {
			// 		for(var j in r.memoryList[x]){
			// 			_this.option.xAxis[0].data.push(new Date(j - 0).getMinutes() + ":" + new Date(j - 0).getSeconds());
			// 			_this.option.series[0].data.push(r.memoryList[x][j]);
			//        }
			// 	}
			//
			// 	_this.chart.setOption(_this.option);
			// })
		},
		destroyed() {
			// this.$root.bus.$off("_areaData99")
			//this.$root.bus.$off("_areaData99")
			//this.$root.bus.$off("_areaData99")
		}
	}
</script>

<style scoped>
    .shark {
        background: rgb(255, 255, 255);
        color: rgb(31, 45, 61);
        border-radius: 3px;
        box-shadow: rgb(219, 236, 172) 0px 0px 13px;
    }

</style>