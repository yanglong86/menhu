<template>
<div>
  <el-upload
    class="avatar-uploader"
    :action="actionUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    >
    <img v-if="url" :src="url" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <span class="avatar-uploader-text">{{tip}}</span>
</div>

</template>
<script>
export default {
  data() {
    return {
      url: "",
      actionUrl: "11111"
    };
  },
  props: ["imageUrl", "keyInd", "part", "tip"],
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(file);
      this.url = URL.createObjectURL(file.raw);
      this.imageUrl[this.keyInd] = file.response.body.filePath;
    }
  },
  mounted: function() {
    if (!this.tip) {
      this.tip = "";
    }
    this.actionUrl = `${process.env.BASE_API}/recon/check/file/file?module=${this
      .part}`;
    console.log(this.imageUrl);
    if (this.imageUrl[this.keyInd]) {
      this.url = `${process.env.BASE_API}/recon/check/file/file/${this.imageUrl[
        this.keyInd
      ]}`;
      console.log(this.url);
    }
  },

  watch: {
    'imageUrl': {
      handler(curVal, oldVal) {
        if (curVal[this.keyInd] !== oldVal[this.keyInd]) {
          this.url = `${process.env.BASE_API}/recon/check/file/file/${curVal[
            this.keyInd
          ]}`;
        }
      },
      deep: true
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  float: left;
}
.avatar-uploader .el-upload img {
  width: 50px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  background: #ffffff;
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}

.avatar-uploader-text {
  display: inline-block;
  line-height: 50px;
  padding-left: 15px;
  color: red;
}
</style>
