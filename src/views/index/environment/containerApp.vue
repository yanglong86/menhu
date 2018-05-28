<template>
  <div class="container-app">
    <h2>部署应用</h2>
    <el-form :model="containerApp" :rules="rules" ref="containerAppForm">
      <el-row>
        <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6" class="label-col">
          <label class="must-star">应用名称</label>
        </el-col>
        <el-col :xs="24" :sm="12" :md="14" :lg="16" :xl="18">
          <el-form-item prop="name">
            <el-input size="small" placeholder="请填写应用名称" v-model="containerApp.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6" class="label-col">
          <label class="must-star">名字空间（namespace）</label>
        </el-col>
        <el-col :xs="24" :sm="12" :md="14" :lg="16" :xl="18">
          <el-form-item prop="namespace">
            <el-select v-model="containerApp.namespace" size="small">
              <el-option v-for="item in namespaces" :label="item.name" :value="item.name" :key="item.name"></el-option>
            </el-select>
            <el-button size="small" type="text" icon="el-icon-plus" @click.native="openDialog">Create a new namespace</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6" class="label-col">
          <label class="must-star">jar服务包</label>
        </el-col>
        <el-col :xs="24" :sm="12" :md="14" :lg="16" :xl="18">
          <el-form-item prop="jarPath">
            <el-upload
              :limit="1"
              :action="actionUrl"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload = "startUpload"
              :file-list="fileList">
              <el-button size="small">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6" class="label-col">
          <label class="must-star">Number of pods</label>
        </el-col>
        <el-col :xs="24" :sm="12" :md="14" :lg="16" :xl="18">
          <el-form-item prop="replicas">
            <el-input type="number" size="small" min="1" v-model="containerApp.replicas"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6" class="label-col">
          <label>Description</label>
        </el-col>
        <el-col :xs="24" :sm="12" :md="14" :lg="16" :xl="18">
          <el-form-item prop="description">
            <el-input type="text" size="small" v-model="containerApp.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6" class="label-col">
          <label>CPU Requirement(cores)</label>
        </el-col>
        <el-col :xs="24" :sm="12" :md="14" :lg="16" :xl="18">
          <el-form-item prop="cpuRequirement">
            <el-input type="number" size="small" v-model="containerApp.cpuRequirement"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6" class="label-col">
          <label>Memory Requirement(MiB)</label>
        </el-col>
        <el-col :xs="24" :sm="12" :md="14" :lg="16" :xl="18">
          <el-form-item prop="memoryRequirement">
            <el-input type="number" size="small" v-model="containerApp.memoryRequirement"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="0" :sm="12" :md="10" :lg="8" :xl="6" class="label-col">
          <label style="visibility: hidden">按钮</label>
        </el-col>
        <el-col :xs="12" :sm="5" :md="6" :lg="4" :xl="3">
          <el-button size="middle" type="primary" style="margin-right: 15px" @click.native="createSubmit">
            部&nbsp;&nbsp;署
          </el-button>
        </el-col>
        <el-col :xs="12" :sm="7" :md="8" :lg="12" :xl="15">
          <el-button size="middle" type="info" @click.native="createCancel">取&nbsp;&nbsp;消</el-button>
        </el-col>
      </el-row>

    </el-form>

      <namespace ref="namespace" :templateId="envId" @namespace-success="getNamespace"></namespace>
  </div>
</template>

<script>
  import namespace from '../common/namespace'
  export default {
    name: 'ContainerApp',
    data() {
      var validateName = function(rule, value, callback) {
        var reg = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$/
        if (!reg.test(value)) {
          return callback(new Error('应用名称格式不正确'))
        }
        callback()
      }
      var validateReplicas = function(rule, value, callback) {
        if (Number(value) < 1) {
          return callback(new Error('Number of pods 的值不能小于1'))
        }
        callback()
      }
      return {
        userId: '',
        envId: '',
        actionUrl: '',
        containerApp: {
          name: '',
          jarPath: '',
          replicas: '1',
          description: '',
          namespace: '',
          cpuRequirement: '',
          memoryRequirement: ''
        },
        fileList: [],
        namespaces: [],
        rules: {
          name: [
            { required: true, message: '请填写应用名称', trigger: 'blur' },
            { min: 1, max: 24, message: '长度不能超过24个字符', trigger: 'blur' },
            { validator: validateName, trigger: 'blur' }
          ],
          namespace: [
            { required: true, message: '请选择命名空间', trigger: 'change' }
          ],
          replicas: [
            { required: true, message: '请填写 Number of pods', trigger: 'blur' },
            { validator: validateReplicas, trigger: 'blur' }
          ]
        },
        dialogVisible: false,
        uploadLoading: ''
      }
    },
    components: {
      namespace
    },
    methods: {
      // 获取命名空间列表数据
      getNamespace() {
        var _this = this
        this.$root.ax(
          `/recon/check/console/dashboard/namespace/get/${this.envId}`, 'get', { templateId: this.envId })
          .then(r => {
            if (r.data && r.data.length) {
              _this.namespaces = r.data
              _this.containerApp.namespace = r.data[0].name
            }
          }, e => {
            this.$message.error(e.message)
          })
      },
      // 打开创建命名空间弹窗
      openDialog() {
        this.$refs['namespace'].openDialog()
      },
      // 部署确认
      createSubmit() {
        if (this.submitForm('containerAppForm')) {
          if (!this.containerApp.jarPath) {
            this.$message.error('请先上传jar服务包！')
            return
          }
          this.$root.ax(
            '/recon/check/console/dashboard/deployment/verify', 'get', {
              templateId: this.envId,
              namespace: this.containerApp.namespace,
              name: this.containerApp.name
            })
            .then(r => {
              if (r.data.flag) {
                this.$message.error(`${this.containerApp.namespace}命名空间下已经部署了名为${this.containerApp.name}的应用`)
              } else {
                this.uploadLoading.close()
                this.uploadLoading = this.$loading({
                  lock: true,
                  text: '部署应用中，请等待...',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$root.ax(
                  '/recon/check/console/dashboard/deployment/deploy', 'post', this.containerApp)
                  .then(r => {
                    this.uploadLoading.close()
                    if (r.message.toUpperCase() === 'SUCCESS') {
                      this.$message.success('部署应用成功！')
                    } else {
                      this.$message.error('部署应用失败！')
                    }
                  }, e => {
                    this.$message.error(e.message)
                    this.uploadLoading.close()
                  })
              }
            }, e => {
              this.$message.error(e.message)
            })
        }
      },
      // 取消部署
      createCancel() {
        this.$router.go(-1)
      },
      submitForm(formName) {
        let res = false
        this.$refs[formName].validate((valid) => {
          if (valid) {
            res = true
          } else {
            res = false
          }
        })
        return res
      },
      // 开始上传jar包
      startUpload() {
        this.uploadLoading = this.$loading({
          lock: true,
          text: '正在上传服务包，请等待...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      },
      // 上传jar包成功
      handleSuccess(res) {
        this.uploadLoading.close()
        this.containerApp.jarPath = res.body.filePath
      },
      // 上传失败
      handleError(err, file) {
        this.$message.error(`${file.name} 上传失败`)
        this.uploadLoading.close()
      },
      // 删除文件前
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleRemove(file) {
        this.$message.warning(`${file.name} 已删除`)
      },
      // 上传文件超出limit
      handleExceed() {
        this.$message.warning('当前限制选择 1 个文件，请先删除再上传')
      }
    },
    mounted() {
      this.envId = this.$route.params.id
      // this.actionUrl = `${process.env.BASE_API}/recon/check/file/file?module=api`
      this.actionUrl = `http://10.50.8.25:8080/check/file/file?module=api&userId=1`
      this.getNamespace()
    }
  }
</script>

<style scoped>
  .container-app {
    font-size: 13px;
    width: 70%;
    margin-left: 10%;
    margin-bottom: 15px;
  }
  .container-app>h2{
    margin-bottom: 30px;
  }

  .label-col{
    text-align: right;
    padding-right: 15px;
  }

  .label-col>label{
    line-height: 40px;
  }
</style>
