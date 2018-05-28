<template>
    <div>
        <ul class="list-circles">
            <li>
                <i>1</i>
                <span>
                  启动一台linux主机并在主机上安装好我们支持的版本的Docker
                </span>
            </li>
            <li>
                <i>2</i>
                <span>
                    确认安全组或防火墙允许以下通讯：
                </span>
                <ul>
                    <li>
                      <span>
                        与其他所有主机之间的<code> UDP </code>端口<code> 500 </code>和<code> 4500 </code>(用于IPsec网络)
                      </span>
                    </li>
                </ul>
            </li>
            <li>
                <i>3</i>
                <span>
                  可选项：在主机上增加标签
                </span>
                <AddTab @tabs-update="updateTabs"></AddTab>
            </li>
            <li>
                <i>4</i>
                <span>
                  指定用于注册这台主机的公网IP。如果留空，Rancher会自动检测IP注册。通常在主机有唯一公网IP 的情况下这是可以的。如果主机位于防火墙/NAT设备之后，或者主机同时也是运行<code> rancher/server </code>容器的主机时，则必须设置此IP。
                </span>
                <div>
                    <el-input placeholder="例如:1.2.3.4" v-model='agentIp'>
                    </el-input>
                </div>
            </li>
            <li>
                <i>5</i>
                <span>
                  将下列脚本拷贝到每一台主机上运行以注册 Rancher:
                </span>
                <Copy :targetData="registerUrl"></Copy>
            </li>
            <li>
                <i>6</i>
                <span>
                  点击下面的关闭按钮，新的主机注册后会显示在 主机 页面。
                </span>
                <div class="add-close">
                    <el-button type="primary" @click="closeBtn">关闭</el-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import AddTab from "./addTab";
import Copy from "../../common/copy";
export default {
  data() {
    return {
      urlPre: "",
      _urlPre: "",
      urlSuf: "",
      _urlSuf: "",
      agentIp: "",
      tabs: ""
    };
  },
  computed: {
    registerUrl() {
      return (this.urlPre || "") + (this.urlSuf || "");
    }
  },
  components: {
    AddTab,
    Copy
  },
  methods: {
    // 标签更新时
    updateTabs(tabs) {
      var params = [];
      tabs.forEach(ele => {
        if (ele.k.length) {
          params.push(ele.k + "=" + ele.v);
        }
      });
      this.tabs = params.join("&");
      this.updateUrl();
    },
    // 更新主机注册脚本
    updateUrl() {
      if (this._urlPre) {
        this.urlPre = this._urlPre;
        var tabString = this.tabs.length
          ? ` -e CATTLE_HOST_LABELS='${this.tabs}'`
          : "";
        var ipString = this.agentIp.length
          ? ` -e CATTLE_AGENT_IP='${this.agentIp}'`
          : "";
        this.urlPre += ipString + " " + tabString;
      }
    },
    // 获取主机注册的URL
    getRegisterUrl() {
      this.$root
        .ax(
          `/recon/check/console/rancher/registerUrl/get/${
            this.$route.params.id
          }`,
          "GET",
          null
        )
        .then(
          r => {
            this.urlPre = r.data.urlPre;
            this._urlPre = r.data.urlPre;
            this.urlSuf = r.data.urlSuf;
            this._urlSuf = r.data.urlSuf;
          },
          e => {
            console.log(e.message);
          }
        );
    },
    closeBtn() {
      this.$router.go(-1);
    }
  },
  watch: {
    agentIp(newVal) {
      this.urlPre = this._urlPre;
      this.updateUrl();
    }
  },
  mounted() {
    this.getRegisterUrl();
  }
};
</script>

<style scoped>
span > code {
  color: #e67e22;
  background-color: #fcf2e9;
  display: inline;
  padding: 2px 3px;
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
ul.list-circles {
  font-size: 14px;
  color: #2c3e50;
  line-height: 1.4;
  list-style: none;
  padding: 0;
  margin: 0 5%;
  margin-top: 15px;
}
ul.list-circles > li {
  padding-bottom: 30px;
  padding-left: 50px;
  position: relative;
  background-image: url("../../../../assets/images/step.png");
  background-repeat: no-repeat;
  padding-top: 8px;
}
ul.list-circles > li:last-child {
  background-image: url("../../../../assets/images/circle.png");  
}
ul.list-circles > li > i {
  position: absolute;
  left: 0;
  top: 0;
  width: 34px;
  line-height: 38px;
  color: #667f85;
  text-align: center;
  font-style: normal;
  line-height: 32px;
  margin-right: 10px;
}
ul.list-circles > li > ul,
ul.list-circles > li > div {
  margin-top: 15px;
}
ul.list-circles > li > div.add-close {
  text-align: center;
  margin-top: 50px;
}
</style>


