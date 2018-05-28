<template>
    <div class="shark">
        <div class="title">{{part}}</div>

        <el-table
                :data="tableData"
                size="mini"
                border
                style="width: 100%">

            <el-table-column :label="item.label" v-for="(item,key) in tableTpl"
                             :key="key">

                <template slot-scope="scope">
                    <span @click="goTarget(item.label,scope.row[item.prop])" :class="{'link':item.label==='Name'}"
                          v-if="!item.list & !item.actionList">
                        {{ scope.row[item.prop]}}
                        <!--<ul v-for="o in scope.row[item.prop]" v-if="item.prop === 'labels'">-->
                        <!--<li>{{o}}</li>-->
                        <!--</ul>-->
                    </span>
                    <span v-for="(o,k) in item.actionList" :key='k' :title="item.title"
                          style="font-size: 16px;margin: 0 7px" @click="act(o, scope.row)"
                          v-if="item.actionList">
                        <svg-icon :icon-class="o.icon"></svg-icon>
                    </span>
                    <ul v-if="item.list">
                        <li v-for="(o ,k) in scope.row[item.prop]" :key="k">{{o}}</li>
                    </ul>
                </template>
            </el-table-column>
            <el-table-column width="50" v-if="showAction">
                <template slot-scope="scope">
                    <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <svg-icon icon-class="threepoints_vertical"></svg-icon>
                  </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native.stop="handleScale(scope.row, scope.$index)" v-if="part === 'deployments' || part === 'replicaset'">
                                Scale
                            </el-dropdown-item>
                            <el-dropdown-item @click.native.stop="handleDelete(scope.row, scope.$index)">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>

        </el-table>

        <scale ref="scaleDeployment"
               :namespace="namespace"
               :templateId="templateId"
               :modelType="part">
        </scale>
    </div>
</template>

<script>
	import * as talbelObj from './../table_model.js'
	import scale from './scale'

	export default {
		name: "talbels",
		props: {
			tableData: {
				type: Array,
				default: function () {
					return [];

				}
			},
			part: {
				default: 'pods'
			},
			baseUrl: "",
			api: '',
      showAction: {
				default: true
			}
		},
		components: {
			scale
		},
		data() {
			return {
				tableTpl: [],
				templateId: '',
				namespace: '',
        curIndex: ''
			}
		},
		methods: {
			goTarget(s, j) {
				let _this = this;
				// Name


				if (s !== 'Name') {
					return
				}
				let path = "";
				console.log(this.$route.fullPath)
				if (!this.baseUrl) {
					path = this.$route.fullPath.replace('workloads', _this.part).replace("?", `/${j}?mod=${this.part}&`)
				} else {
					path = `${_this.baseUrl}/${j}?mod=${_this.part}&namespace=${_this.$route.query.namespace}`
				}

				_this.$router.push(path);

			},


			act(o, row) {
				let sendData = {};
				for (let k in o.sendData) {
					sendData[k] = row[o.sendData[k]];
				}

				if (o.val === 'activate' && row.state === "active") {
					this.$message({
						type: 'info',
						message: '当前已经是开启状态'
					});
					return;
				}

				if (o.val === 'deactivate' && row.state === "inactive") {
					this.$message({
						type: 'info',
						message: '当前已经是暂停状态'
					});
					return;
				}

				sendData[o.key] = o.val;
				console.log(sendData)
				if (o.val === 'delete') {
					if (row.state !== "inactive") {
						this.$message({
							type: 'info',
							message: '当前不处于暂停状态，不能关闭！'
						});
						return;

					}


					this.$confirm('此操作将永久删除该K8S, 是否继续?', '提示', {
						confirmButtonText: '继续',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$root.ax(this.api, o.met, sendData).then(r => {

							for (var x in this.tableData) {
								if (this.tableData[x].id === row.id) {
									this.tableData.splice(x, 1);
									break;
								}
							}

							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						}, e => {
						})

					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				} else {
					this.$root.ax(this.api, o.met, sendData).then(r => {
						for (var x in this.tableData) {
							if (this.tableData[x].id === row.id) {
								if (o.val === 'activate') {
									this.tableData[x].state = 'active'
								} else {
									this.tableData[x].state = 'inactive'
								}
								break;
							}
						}

						this.$message({
							type: 'success',
							message: '操作成功!'
						});
					}, e => {
					})
				}


			},
    // 修改pods
    handleScale(item, rowIndex) {
      this.curIndex = rowIndex
      this.$refs.scaleDeployment.openDialog(item)
    },
    // 更新pods
    updatePods(desired) {
      this.tableData[this.curIndex].pods = desired + '/' + desired
    },
    // 删除deployment
    handleDelete(item, rowIndex) {
      const _this = this
      let url = ''
      let title = ''
      switch (this.part) {
        case 'deployments':
          url = '/recon/check/console/dashboard/deployment/delete'
          title = '删除 Deployment'
          break
        case 'pods':
          url = '/recon/check/console/dashboard/pods/delete'
          title = '删除 Pod'
          break
        case 'replicaset':
          url = '/recon/check/console/dashboard/replicaSet/pods'
          title = '删除 Replica'
          break
        case 'service':
          url = '/recon/check/console/dashboard/service/delete'
          title = '删除 Service'
          break
        default:
          break
      }
      this.$confirm(`此操作将永久删除 ${item.name}, 是否继续?`, title, {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$root.ax(url, 'DELETE', {
          modelName: item.name,
          namespace: this.namespace,
          templateId: this.templateId
        }).then(r => {
          if (r.message.toUpperCase() === 'SUCCESS') {
            this.$message.success('删除成功')
            _this.tableData.splice(rowIndex, 1)
          } else {
            this.$message.error(r.message)
          }
        }, e => {
          this.$message.error(e.message)
        })
      }
      ).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  },
		mounted() {
			var _this = this;
			console.log(_this.part)
			console.log(talbelObj)
			_this.tableTpl = talbelObj[_this.part];
			this.templateId = this.$route.params.id
			this.namespace = this.$route.query.namespace
		}
		,
		watch: {}
		,
		created() {
		}
		,
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
    }

    .shark {
        background: rgb(255, 255, 255);
        color: rgb(31, 45, 61);
        border-radius: 3px;
        box-shadow: rgb(219, 236, 172) 0px 0px 13px;
    }

    .link {
        color: #409eff;
        cursor: pointer;
    }

    .el-dropdown-link {
        color: rgba(0, 0, 0, 0.54);
        font-size: 24px;
        cursor: pointer;
    }

</style>
