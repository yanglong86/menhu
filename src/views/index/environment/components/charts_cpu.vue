<template>
    <div :class="className" :id="id" :style="{height:height,width:'auto'}"></div>
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
				default: 'chart'
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
					animation: false,
					backgroundColor: '#FFFFFF',
					title: {
						text: 'CPU',
						textStyle: {
							fontWeight: 'normal',
							fontSize: 16,
							color: '#394056'
						},
						left: '6%'

					},
					tooltip: {
						trigger: 'axis',
						formatter: function (data) {
							var str = "";
							if (data[0].name === '0') {
								str = "未知 second ago" + "<br/>"
							} else {
								str = Math.ceil((new Date().getTime() - new Date(data[0].name).getTime()) / 1000) + " second ago" + "<br/>";
							}
							for (var x in data) {
								str = str + data[x].seriesName + " : " + data[x].value + '% <br/>'
							}
							return str //将小数转化为百分数显示
						}
					},
					legend: {
						icon: 'rect',
						itemWidth: 14,
						itemHeight: 5,
						itemGap: 13,
						data: ['系统', '用户'],
						right: '4%',
						textStyle: {
							fontSize: 12,
							color: '#394056'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						top: '30%',
						border: "red",
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						show: false,
						axisLine: {
							lineStyle: {
								color: '#57617B'
							}
						},
						data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
					}],
					yAxis: [{
						type: 'value',
						name: '单位（%）',

						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#57617B'
							}
						},
						axisLabel: {
							margin: 10,
							textStyle: {
								fontSize: 14
							}
						},
						splitLine: {
							lineStyle: {
								color: '#57617B'
							},
							show: false,
						}
					}],
					series: [{
						name: '用户',
						type: 'line',
						smooth: true,
						symbol: 'circle',
						symbolSize: 5,
						showSymbol: false,
						lineStyle: {
							normal: {
								width: 1
							}
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#e0edba'
								}, {
									offset: 0.8,
									color: '#f2ffc7'
								}], false),
								shadowColor: '#cad6b3',
								shadowBlur: 10
							}
						},
						itemStyle: {
							normal: {
								color: '#a0ad81',
								borderColor: 'rgba(0,136,212,0.2)',
								borderWidth: 12

							}
						},
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					}, {
						name: '系统',
						type: 'line',
						smooth: true,
						symbol: 'circle',
						symbolSize: 5,
						showSymbol: false,
						lineStyle: {
							normal: {
								width: 1
							}
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#7bdea9'
								}, {
									offset: 0.8,
									color: '#a7ffcf'
								}], false),
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowBlur: 10
							}
						},
						itemStyle: {
							normal: {
								color: '#71ce9d',
								borderColor: 'rgba(137,189,2,0.27)',
								borderWidth: 12

							}
						},
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					}]
				}
			}
		},
		mounted() {
			var _this = this;
			this.initChart();
			_this.chart.setOption(_this.option);

			setInterval(() => {


			}, 1000)
		},
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			this.chart.dispose()
			this.chart = null
		},
		methods: {
			initChart() {
				this.chart = echarts.init(document.getElementById(this.id))
			},

			updataData(t, d, d1) {
				//去除脏数据
				if (this.option.series[0].data.length > 21) {
					this.option.xAxis[0].data.shift();
					this.option.series[0].data.shift();
					this.option.series[1].data.shift();
				}

				//更新新数据
				this.option.xAxis[0].data.push(t);
				this.option.series[0].data.push(d);
				this.option.series[1].data.push(d1);

				//刷新数据
				this.chart.setOption(this.option);
			},

			aaaa(v) {
			}
		},
		created() {
			var _this = this;
			this.$root.bus.$on("_host4scoket", r => {
				_this.updataData(r.timestamp, r.cpuUse, r.cpuSystem);
			})
		},
		destroyed() {
			this.$root.bus.$off("_host4scoket")
		}
	}
</script>
