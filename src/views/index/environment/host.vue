<template>
    <el-row>
        <el-col :xs="24" :sm="12" :md="8" :lg="5" :xl="5">
            <host-info ref="getInfo"></host-info>
        </el-col>
        <el-col :xs="24" :sm="12" :md="16" :lg="19" :xl="19">
            <div style="width: 100%">
                <el-row style="padding: 15px">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="padding: 15px">
                        <cpu></cpu>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="padding: 15px">
                        <int></int>
                    </el-col>

                </el-row>

                <el-row style="padding: 15px">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="padding: 15px">
                        <net></net>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="padding: 15px">
                        <sto></sto>
                    </el-col>

                </el-row>


            </div>
        </el-col>
    </el-row>
</template>

<script>
	import Stomp from 'stompjs'
	import hostInfo from "./components/host_info"
	import cpu from "./components/charts_cpu"
	import int from "./components/charts_internal"
	import net from "./components/charts_network"
	import sto from "./components/charts_storage"

	export default {
		name: "host",
		components: {hostInfo, cpu, int, net, sto},
		data() {
			return {
				ws: {} //webScoket
			}
		},
		methods: {
			init(r) {
				if (r !== 'active') {
					return
				}
				var _this = this;
				let bufferUrl = `${process.env.WS_API}/ws`;

				this.ws = new WebSocket(bufferUrl)
				let client = Stomp.over(this.ws)

                console.log(process.env.MQ_USER_NAME)
                console.log(process.env.MQ_PASSWORD)
                console.log(process.env.MQ_V_HOST)

				client.connect(process.env.MQ_USER_NAME, process.env.MQ_PASSWORD, ()=>{
					client.subscribe(`/queue/ms_console_manage_${_this.$route.params.hostId}`, function (data) {
						_this.$root.bus.$emit("_host4scoket", JSON.parse(data.body))
					})
                }, e=>{
					console.log(e);
                }, process.env.MQ_V_HOST);


				//console.log(_this.$route)
				// _this.ws = new WebSocket(`${process.env.WS}/websocket/${_this.$route.params.id}/${_this.$route.params.hostId}`);
				// _this.ws.onopen = function () {
				// 	console.log("Connection open ...");
				// 	// setInterval(()=>{
				// 	// _this.ws.send('id=222')
				// 	// },3000)
				// }
				// _this.ws.onmessage = function (e) {
				// 	_this.$root.bus.$emit("_host4scoket", JSON.parse(e.data))
                //
				// }
                //
				// _this.ws.onclose = function () {
				// 	console.log("Connection onclose ...");
				// }
			}

		},
		mounted() {

		},
		created() {
			let _this = this;
			this.$root.bus.$on("sendActive", _this.init);
		},
		beforeDestroy() {
			this.ws.close()
		},
		destroyed() {
			this.$root.bus.$off("sendActive", this.init);
		}
	}
</script>

<style scoped>


</style>
