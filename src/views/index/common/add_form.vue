<template>
    <div class="warp">
        <span class="btn" @click="showDialog()">{{btnText}}</span>

        <el-dialog :title="myTitle" :visible.sync="forShow" fullscreen>
            <el-form :model="formBase" label-width="80px" label-position="left" ref="formBase">
                <el-row>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="(o,k) in items" :key="k"
                            style="padding:  0 15px">
                        <el-form-item :label="o.label" :prop="o.key"
                                      :rules="[ { required: true, message: '不能为空', trigger: 'blur' } ]">
                            <el-input v-model="formBase[o.key]">

                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button type="danger" @click="forShow = false" plain size="mini">取 消</el-button>
                <el-button type="success" @click="save" size="mini" plain>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
	export default {
		name: "add_form",
		props: {
			btnText: {
				default: '按钮'
			},
			myTitle: {
				default: 'Tip'
			},
			items: {
				default: function () {
					return {}
				}
			},
			url: {
				default: ""
			}


		},
		components: {},
		data() {
			return {
				formBase: {
				}, //表单提交的对象
				forShow: false //模态框的显示隐藏
			}
		},
		methods: {
			showDialog() {
				this.forShow = true;
			},
			save() {
				let _this = this;
				console.log(this.formBase)
				this.$refs.formBase.validate(r => {
					if (r) {
						this.$root.ax(this.url, 'post', this.formBase).then(r => {
							_this.$message.success('添加成功！');
							_this.$emit("onsuccess");
							_this.formBase = {}
							this.forShow = false;
						}, e => {
							this.$message.error(e.message)
						})
					} else {
						console.log("required")
					}
				})
			}

		},
		mounted() {
			for (var x in this.items) {
				this.formBase[this.items[x].key] = '';
			}
		},
		watch: {},
		created() {
		},
		destroyed() {
		}
	}
</script>

<style scoped>
    .warp {
        height: 50px;
        line-height: 30px;
        background: #ffffff;
        margin: 5px 0;
    }

    .btn {
        background: #0077a3;
        padding: 8px 15px;
        cursor: pointer;
        font-size: 15px;
        border: 1px solid #006185;
        border-radius: 3px;
        color: #f3f3f3;
    }

    .btn:hover {
        background: #0084b4;
    }

    .btn:active {
        background: #005c82;
        color: #00b9fc;
    }

</style>