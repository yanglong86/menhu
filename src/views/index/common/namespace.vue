<template>
  <div>
    <el-dialog title="新建名字空间"
               :visible.sync="dialogVisible"
               width="50%"
               :close-on-click-modal="false"
               :show-close="false"
               :before-close="closeDialog">
      <el-form :model="newSpace" :rules="rules" ref="spaceForm">
        <el-row>
          <el-col :md="7" class="label-col">
            <label class="must-star lh-40">名字空间称谓</label>
          </el-col>
          <el-col :md="17">
            <el-form-item prop="name">
              <el-input size="small" v-model="newSpace.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dialog-footer">
            <el-button type="primary" size="small" @click.native="confirmDialog">新 建</el-button>
            <el-button size="small" @click.native="cancelDialog">取 消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      templateId: {
        type: String,
        required: true,
        default: ''
      }
    },
    name: 'namespace',
    data() {
      return {
        newSpace: {
          name: '',
          token: ''
        },
        rules: {
          name: [
            { required: true, trigger: 'blur' }
          ]
        },
        dialogVisible: false
      }
    },
    methods: {
      // dialog打开
      openDialog() {
        this.dialogVisible = true
      },
      // dialog关闭
      closeDialog() {
        this.resetForm('spaceForm')
        this.dialogVisible = false
      },
      // dialog确认
      confirmDialog() {
        this.newSpace.token = ''
        if (this.submitForm('spaceForm')) {
          this.$root.ax(
            `/recon/check/console/dashboard/namespace/token/${this.templateId}`, 'get', { templateId: this.templateId })
            .then(r => {
              if (r.data && r.data.token) {
                this.newSpace.token = r.data.token
                this.$root.ax(
                  '/recon/check/console/dashboard/namespace/',
                  'post',
                  { name: this.newSpace.name,
                    token: this.newSpace.token,
                    templateId: this.templateId
                  })
                  .then(r => {
                    this.resetForm('spaceForm')
                    if (r.message.toUpperCase() === 'SUCCESS') {
                      this.dialogVisible = false
                      this.$message.success('新建成功')
                      this.$emit('namespace-success')
                    }
                  }, e => {
                    this.$message.error(e.message)
                  })
              }
            }, e => {
              this.$message.error(e.message)
            })
        }
      },
      // dialog取消
      cancelDialog() {
        this.resetForm('spaceForm')
        this.dialogVisible = false
      },
      submitForm(formName) {
        var res = false
        this.$refs[formName].validate((valid) => {
          if (valid) {
            res = true
          } else {
            res = false
          }
        })
        return res
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
  .dialog-footer{
    text-align: right;
    margin-top: 15px;
  }
  .label-col{
    text-align: right;
    padding-right: 15px;
  }
</style>
