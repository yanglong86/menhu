<template>
    <div>
        <div class="copy-pre">
            <div class="copy-target" id="target">
                {{targetData}}
            </div>
            <div class="copy-button-container">
              <el-tooltip placement="top" content="复制到剪贴板" popper-class="is-primary">
                <button class="btn" data-clipboard-target="#target" @click="copyBtn">
                    <i class="el-icon-document"></i>
                </button>
              </el-tooltip>
                
            </div>
        </div>
    </div>

</template>

<script>
import handleClipboard from "@/utils/clipboard";
export default {
  name: "copy",
  props: {
    targetData: {
      type: String,
      required: true,
      default: ""
    }
  },
  methods: {
    copyBtn(e) {
      handleClipboard(this.targetData, e);
    }
  }
};
</script>

<style scoped>
.copy-pre {
  position: relative;
  min-height: 40px;
}
.copy-target {
  font-size: 11px;
  margin: 10px 1px 0 0;
  padding: 10px;
  padding-right: 60px;
  background-color: #f5f5f5;
  color: #78c9cf;
  line-height: 1.4;
  min-height: 50px;
  word-break: break-all;
  word-wrap: break-word;
  border: 1px solid #ccd1d3;
  border-radius: 1px;
}
.copy-button-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50px;
  display: inline-block;
}
.copy-pre button {
  height: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  color: #fff;
  background: #0075a8;
  border-color: #0075a8;
  width: 50px;
}
.copy-pre button:hover {
  background: #002e42;
  color: #fff;
}
.el-icon-document {
  font-size: 22px;
}
</style>

