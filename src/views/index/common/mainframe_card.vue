<template>
    <el-card class="box-card" v-if="model.state !== 'delete'">
        <div class="clearBoth item">
            <span style="display: inline-block; float: left" class="active"
                  v-if="model.state === 'active'">ACTIVE</span>
            <span style="display: inline-block; float: left" class="deactivate" v-if="model.state === 'deactivate'">DEACTIVATE</span>
            <span style="display: inline-block; float: left" class="deactivate" v-if="model.state === 'inactive'">INACTIVE</span>
            <span style="display: inline-block; float: left" class="deactivate" v-if="model.state === 'disconnected'">DISCONNECTED</span>
            <span style="display: inline-block; float: left" class="deactivate" v-if="model.state === 'reconnecting'">RECONNECTING</span>
            <span style="display: inline-block; float: right;font-size: 16px">
                <i @click="handleDelete(model.hostname)">
                     <svg-icon v-if="model.state === 'inactive'"
                               icon-class="k8sdel"/>
                </i>
                <i @click="setState('deactivate')">
                     <svg-icon v-if="model.state === 'active' || model.state === 'disconnected' || model.state === 'reconnecting'"
                               icon-class="start"/>
                </i>
                <i @click="setState('activate')">
                     <svg-icon v-if="model.state === 'inactive'"
                               icon-class="stop"/>
                </i>



            </span>
        </div>

        <div class="item clearBoth title"><span @click="go">{{model.hostname}}</span></div>
        <div class="clearBoth">
            <div class="ipLeft">
                <svg-icon icon-class="link"/>
                {{model.agentIpAddress}}
            </div>
            <div class="ipRight">
                <svg-icon icon-class="docker"/>
                {{model.dockerVersion.replace('Docker version ','')}}
            </div>
        </div>
        <div class="item clearBoth" style="text-align: center; padding: 12px 0">
            <svg-icon icon-class="linux"/>
            {{model.operatingSystem}}
        </div>
        <div class="clearBoth info">
            <div class="ipLeft">
                <svg-icon icon-class="cpu"/>
                {{model.count}}x0 GHz
            </div>
            <div class="ipCenter">
                <svg-icon icon-class="neicun"/>
                {{model.memTotal}} GiB
            </div>
            <div class="ipRight">
                <svg-icon icon-class="yinpan"/>
                {{model.memory}}Gib
            </div>
        </div>
        <div class="clearBoth" style="height: 35px; line-height: 45px; text-align: center">
            <span style="background: #9c9c9c; padding: 3px 6px; color: #ffffff">{{'host='+model.hostname}}</span>
        </div>
    </el-card>
</template>

<script>
	export default {
		name: "mainframe_card",
		props: {
			model: {   // 可选字段，有默认值
				default: {}
			}
		},
		components: {},
		data() {
			return {}
		},
		methods: {
			go() {
				this.$router.push(`/host/${this.$route.params.id}/${this.model.id}`);
			},
      // 删除主机
      handleDelete(hostname) {
        this.$confirm(`确认是否删除"${hostname}"该台主机？`, '删除主机', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setState('delete')
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
			setState(s) {
				let sendData = {
					templateId: this.$route.params.id,
					hostId: this.model.id,
					status: s
				}
				this.$root.ax('/recon/check/console/rancher/host/status/change', 'get', sendData).then(r => {
					if (s === 'activate'){
						this.model.state = 'active';
                    }


					if (s === 'deactivate'){
						this.model.state = 'inactive';
					}

					if (s === 'delete'){
						this.model.state = 'delete';
					}

				}, e => {
					this.$message.error(e.message)
				})
			}
		},
		mounted() {
		},
		watch: {},
		created() {
		},
		destroyed() {
		}
	}
</script>

<style scoped>
    .clearBoth {
        overflow: hidden;
        clear: both;
    }

    .box-card {
        min-width: 250px;
        width: 100%;
        margin: 8px;
        color: #8a919c;
        font-size: 12px;
    }

    .item {
        padding: 0 0 18px 0;
    }

    .title {
        text-align: center;
        color: #000000;
        font-size: 15px;
        cursor: pointer;
    }

    .title span:hover {
        color: #3a8ee6;
    }

    .ipLeft {
        text-align: center;
        width: 50%;
        float: left;
        border-right: 1px solid #9c9c9c;
    }

    .ipRight {
        text-align: center;
        width: 50%;
        float: right;
    }

    .info .ipLeft, .info .ipCenter, .info .ipRight {
        width: 33.33%;
        float: left;
        text-align: center;
    }

    .info .ipCenter {
        border-right: 1px solid #9c9c9c;
    }

    .active {
        color: #27ae60;
        cursor: pointer;
    }

    .deactivate {
        color: #FF0000;
        cursor: pointer;
    }

</style>
