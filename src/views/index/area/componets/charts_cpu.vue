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
						text: 'CPU usage'
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
							type: 'value'
						}
					],
					series: [
						{
							name: 'CPU使用',
							type: 'line',
							stack: '使用',
							areaStyle: {normal: {}},
							data: []
						}
					],
					color: ['#91f4af']
				}
			}
		},
		mounted() {
			var _this = this;
			this.initChart();
			_this.loadData()


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
					console.log('cpuz折线图', r)
					let cpuArr = r.data.cpuList, y = [], x = [];
					for (let key in cpuArr) {
						y.push(cpuArr[key])
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

		},
		destroyed() {

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