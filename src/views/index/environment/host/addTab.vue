<template>
<div>
    <div class="ember-view">
        <b class="el-icon-circle-plus-outline" @click="addTab"></b>
        <span @click.stop="addTab">添加标签</span>
    </div>
    <ul v-if="tabs.length">
        <li>
            <ul class="tab-title">
                <li>键</li>
                <li>值</li>
            </ul>
        </li>
        <li v-for="(item,index) in tabs" :key="item">
            <ul class="tab-item">
                <li>
                    <el-input v-model="item.k" size="small" placeholder="例如:foo"></el-input>
                </li>
                <li>
                    <span>=</span>
                </li>
                <li>
                    <el-input v-model="item.v" size="small" placeholder="例如:bar"></el-input>
                </li>
                <li>
                    <el-button class="el-icon-minus" type="primary" size="small" @click="minusTab(index)"></el-button>
                </li>
            </ul>
        </li>
    </ul>
</div>

</template>

<script>
export default {
  data() {
    return {
      tabs: []
    };
  },
  methods: {
    addTab() {
      this.tabs.push({
        k: "",
        v: ""
      });
    },
    minusTab(index) {
      this.tabs.splice(index, 1);
    }
  },
  watch: {
    tabs: {
      handler(newVal) {
        this.$emit("tabs-update", this.tabs);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.el-button--primary {
  color: #fff;
  background-color: #0075a8;
  border-color: #0075a8;
}
.el-button--primary:hover {
  background: #00558b;
  border-color: #00558b;
}
div.ember-view {
  display: inline-block;
  min-height: 36px;
  padding: 20px 0;
}
div.ember-view:hover {
  color: #999;
}
div.ember-view > b {
  font-size: 22px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
div.ember-view > span {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
.tab-item::after,
.tab-title:after {
  content: "";
  display: table;
  clear: both;
}

.tab-item > li,
.tab-title > li {
  margin-bottom: 10px;
  line-height: 32px;
  float: left;
}
.tab-title > li {
  width: 50%;
}
.tab-item > li:nth-child(1) {
  width: 40%;
}
.tab-item > li:nth-child(2) {
  width: 10%;
  text-align: center;
}
.tab-item > li:nth-child(3) {
  width: 40%;
}
.tab-item > li:nth-child(4) {
  width: 10%;
}
</style>


