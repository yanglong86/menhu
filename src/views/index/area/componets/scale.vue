<template>
  <div class="scale">
    <el-dialog :title="'Scale a ' + title"
               :visible.sync="dialogVisible"
               width="40%"
               :close-on-click-modal="false"
               :show-close="false"
               :before-close="closeDialog">
      <el-form ref="dialogForm" :model="podsNum" :rules="rules">
        <el-row>
          <el-col>
            <p class="description">
              Resource {{podsNum.modelName}} will be updated to reflect the desired count.
              Current status: {{podsNum.created}} created,{{podsNum.desired}} desired.
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="10" class="label-col">
            <label class="must-star">Desired number of pods</label>
          </el-col>
          <el-col :md="14">
            <el-form-item prop="desired">
              <el-input size="small" v-model="podsNum.desired" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dialog-footer">
            <el-button type="primary" size="small" @click.native="confirmDialog">OK</el-button>
            <el-button size="small" @click.native="cancelDialog">CANCEL</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'scale',
    props: {
      modelType: {
        type: String,
        required: true,
        default: ''
      },
      templateId: {
        type: String,
        required: true,
        default: ''
      },
      namespace: {
        type: String,
        required: true,
        default: ''
      }
    },
    data() {
      return {
        podsNum: {
          desired: '',
          created: '',
          modelName: ''
        },
        rules: {
          desired: [
            { required: true, message: 'Desired number of pods is required', trigger: 'blur' }
          ]
        },
        dialogVisible: false,
        title: ''
      }
    },
    methods: {
      // dialog打开
      openDialog(item) {
        const pods = item.pods
        this.dialogVisible = true
        this.podsNum.created = pods.split('/')[0]
        this.podsNum.desired = pods.split('/')[1]
        this.podsNum.modelName = item.name
        this.title = this.modelType === 'deployments' ? 'deployment' : 'replicaset'
      },
      // dialog关闭
      closeDialog() {
        this.resetForm('dialogForm')
        this.dialogVisible = false
      },
      // dialog确认
      confirmDialog() {
        if (this.submitForm('dialogForm')) {
          const url = this.modelType === 'deployments' ? '/recon/check/console/dashboard/deployment/pods' : '/recon/check/console/dashboard/replicaSet/pods'
          this.$root.ax(url, 'PUT', {
            desired: this.podsNum.desired,
            modelName: this.podsNum.modelName,
            namespace: this.namespace,
            templateId: this.templateId
          }).then(r => {
            if (r.message.toUpperCase() === 'SUCCESS') {
              this.$message.success('操作成功')
              this.$parent.updatePods(this.podsNum.desired)
              this.dialogVisible = false
            } else {
              this.$message.error(r.message)
            }
          }, e => {
            this.$message.error(e.message)
          })
        }
      },
      // dialog取消
      cancelDialog() {
        this.resetForm('dialogForm')
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
  .description{
    color: #333;
    font-size: 15px;
  }
  .dialog-footer{
    text-align: right;
    margin-top: 15px;
  }
  .label-col{
    text-align: right;
    padding-right: 15px;
  }
  .label-col>label{
    font-weight: normal;
    color: #999;
    line-height: 40px;
  }
</style>
