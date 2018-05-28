<template>
  <div class="add-host">
    <div class="title">
      <a @click="goBack">主机：</a>
      <span>添加主机</span>
    </div>
    <Steps></Steps>
  </div>
</template>

<script>
import Steps from "./host/steps";
export default {
  name: "add_host",
  components: {
    Steps
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.add-host {
  background: #ecf0f1;
  padding: 20px;
}
.title {
  font-size: 21px;
  font-weight: 700;
  margin-right: 10px;
  padding-bottom: 20px;
}
.title > a {
  color: #24789e;
}
.title > a:hover {
  color: #78c9cf;
}
</style>

