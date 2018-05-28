<template>
    <div class="wrap">
        <ul>
            <li class="title">ip:</li>
            <li class="info">{{host.agentIpAddress}}</li>
        </ul>

        <ul>
            <li class="title">CPU:</li>
            <li class="info">总计:{{host.count}}x0 Ghz &nbsp;&nbsp;&nbsp;&nbsp; 限制:{{host.count*1000}} mCPU</li>
        </ul>

        <ul>
            <li class="title">内存:</li>
            <li class="info">总计: {{host.memTotal}} GiB &nbsp;&nbsp;&nbsp;&nbsp; 限制: {{host.memTotal}} GiB</li>
        </ul>

        <ul>
            <li class="title">存储:</li>
            <li class="info">{{host.centOsMemory[0]}} GiB {{host.centOsMemory[1]}} GiB 本地存储: {{host.localStorageMb}}
                TiB
            </li>
        </ul>

        <ul>
            <li class="title">提供者:</li>
            <li class="info">{{host.cloudProvider ? host.cloudProvider : "自定义"}}</li>
        </ul>

        <ul>
            <li class="title">内核:</li>
            <li class="info">{{host.kernelVersion ? host.kernelVersion : ""}}</li>
        </ul>

        <ul>
            <li class="title">Docker:</li>
            <li class="info">{{host.dockerVersion}}</li>
        </ul>

        <ul>
            <li class="title">操作系统:</li>
            <li class="info">{{host.operatingSystem}}</li>
        </ul>
    </div>
</template>

<script>
	export default {
		name: "host_info",
		components: {},
		data() {
			return {
				host: {}
			}
		},
		methods: {
			getActive() {
				return this.$parent
			}
		},
		mounted() {
			let _this = this;
			this.$root.ax(`/recon/check/console/rancher/hostInfo/get/${this.$route.params.id}/${this.$route.params.hostId}`, 'GET', null)
				.then(r => {
					this.host = r.data;

					this.$root.ax(`/recon/check/console/rabbit/verify`, 'get', {
							templateId: this.$route.params.id,
							hostId: this.$route.params.hostId
						})
						.then(r => {
							_this.$root.bus.$emit("sendActive", _this.host.state)
						}, e => {
						})
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
    .wrap {
        padding: 0 25px 0 0;

    }

    ul li {
        list-style: none;
        border: none;
        padding: 0;
        margin: 0;
    }

    .title {
        font-size: 16px;
        font-weight: 500;
        height: 45px;
        line-height: 45px;
    }

    .info {
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid #ccd1d3;
        color: #2c3e50;
        font-size: 14px;
    }
</style>
