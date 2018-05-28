<template>
    <div class="nav">
        <span class="niu nav-item" style="width: 65px"><svg-icon icon-class="niu"/></span>
        <span class="nav-item">
            <el-select v-model="ct" placeholder="请选择" class="nav-menu" @change="setId" @visible-change="goHost">
                <el-option
                        v-for="item in envList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
        </span>
        <span class="nav-item fr">
          <el-tooltip effect="dark" content="Create an application">
            <el-button type="primary" size="small" icon="el-icon-plus" @click.native="createContainerApp"> CREATE</el-button>
          </el-tooltip>
        </span>
    </div>
</template>

<script>
	export default {
		name: "sider_bar",
		components: {},
		data() {
			return {
				envList: [],
				ct: '',
				envId: ''
			}
		},
		methods: {
			//加载信息
			loadList() {
				this.$root.ax("/recon/check/console/rancher/environment", "GET", null).then(r => {
					this.envList = r.data;
					if (this.$route.params.id) {
						this.ct = this.$route.params.id;
						this.envId = this.$route.params.id
					} else {
						this.ct = r.data[0].id;
						this.envId = r.data[0].id
						this.goHost(this.ct);
					}
					this.envList.push({id:'env',name:"环境管理"})
				}, e => {
					this.$message.error(e.message);
				})
			},
			setId(val) {
				this.envId = val;
			},

			//前往主机
			goHost(val) {
				if (val) {
					return;
				}
				if (!this.envId) {
					return
				}
				if(this.envId === 'env'){
					this.$router.push({path: `/${this.envId}`});
					return
                }
				this.$router.push({path: `/mainframe/${this.envId}`});
				this.$root.bus.$emit("_loadCard", "*")
			},
      // 创建容器应用
      createContainerApp() {
        this.$router.push({ path: `/containerApp/${this.envId}` })
      }
		},

		mounted() {
			this.loadList();
		},
		watch: {},
		created() {
		},
		destroyed() {
		}
	}
</script>

<style>
    .nav {
        height: 45px;
        line-height: 45px;
        background: #0077a3;
        color: #ffffff;
    }

    .nav-item {
        display: inline-block;
        height: 45px;
        width: 120px;
        vertical-align: bottom;
    }

    .niu {
        font-size: 38px;
        padding-left: 15px;
    }

    .nav-menu .el-input input {
        height: 45px;
        background: #005875;
        color: #ffffff;
        border: none;
    }

    .nav-menu .el-input input:hover {
        background: #00465d;
    }


</style>
