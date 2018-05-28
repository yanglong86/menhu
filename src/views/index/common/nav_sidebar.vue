<template>
    <div class="main_nav">
        <div class="title" @click="goHost" :class="{'active': isCurrentHost('mainframe')}">主机
		</div>
        <div style="border-bottom: 1px solid #d1d2d1; margin: 20px 0"></div>
        <div class="title" style="cursor: no-drop;color: #a6a7a6">命名空间</div>
        <div class="info">
            <el-select v-model="currentArea" placeholder="请选择" style="border: none" @change="changeArea">
                <el-option
                        v-for="item in area"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
        </div>
        <div class="title hlist" @click="toArea('workloads')" :class="{'active': isCurrent('workloads')}">Workloads
        </div>

        <div class="info">
            <div class="list hlist" @click="toArea('deployments')" :class="{'active': isCurrent('deployments')}">
                deployments
            </div>
            <div class="list hlist" @click="toArea('pods')" :class="{'active': isCurrent('pods')}">pods</div>
            <div class="list hlist" @click="toArea('replicaset')" :class="{'active': isCurrent('replicaset')}">Replica
                Set
            </div>
        </div>

        <div class="title hlist">Discovery and Load Balancing</div>

        <div class="info">
            <div class="list hlist" @click="toArea('services')" :class="{'active': isCurrent('services')}">Services
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "nav_sidebar",
		components: {},
		data() {
			return {
				part: "workloads",
				area: [],
				currentArea: '',
				currentPart: ''
			}
		},
		methods: {
			//加载命名空间
			loadArea() {
				this.$root.ax(`/recon/check/console/dashboard/namespace/get/${this.$route.params.id}`, 'get', null).then(r => {

					this.area = [];
					this.area = r.data;
					if (this.$route.query.namespace) {
						this.currentArea = this.$route.query.namespace;
						return
					}
					if (this.area.length !== 0)
						this.currentArea = r.data[0].name;
				}, e => {
					this.$message.error(e.message)
				})
			},

			toArea(s) {
				this.part = s;
				this.currentPart = s;
				this.$router.push(`/area/${this.$route.params.id}/${s}?namespace=${this.currentArea}`);
			},

			isCurrent: function (s) {

				let bufferArr = this.$route.path.split('/');
				if (bufferArr.length < 3) {
					return false
				}
				return bufferArr[3] === s;
			},

			isCurrentHost(s){

				let bufferArr = this.$route.path.split('/');
				if (bufferArr.length <2) {
					return false
				}
				return bufferArr[1] === s;

            },


			changeArea(val) {
				this.$router.push(`/area/${this.$route.params.id}/${this.part}?namespace=${val}`);
			},

			goHost(){
				this.$router.push({path: `/mainframe/${this.$route.params.id}`});
            }

		},
		mounted() {
			this.currentArea = this.$route.query.namespace;
			this.loadArea();
		},
		watch: {},
		computed: {},
		created() {
			let _this = this;
			this.$root.bus.$on('_loadCard', r => {
				_this.loadArea();
			})
		},
		destroyed() {
			this.$root.bus.$off('_loadCard');
		}
	}
</script>

<style scoped>
    .main_nav {
        background: rgb(255, 255, 255);
        padding: 25px 8px;
        margin: 10px 0px;
        color: rgb(31, 45, 61);
        border-radius: 3px;
        box-shadow: rgb(219, 236, 172) 0px 0px 13px;
    }

    .title {
        height: 40px;
        line-height: 50px;
        cursor: pointer;

    }

    .info {
        padding: 0 15px;
    }

    .list {
        height: 25px;
        line-height: 25px;
        cursor: pointer;
        font-size: 13px;
    }

    .hlist:hover {
        color: #306fde;
    }

    .active {
        color: #41aeb6 !important;
    }

</style>
