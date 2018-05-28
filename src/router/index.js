import Vue from "vue";
import Router from "vue-router";

const _import = require("./_import_" + process.env.NODE_ENV);
Vue.use(Router);
export const constantRouterMap = [
	{
		path: "/",
		component: _import("index/index"),
		name: "k8s",
		children: [
			{path: "/mainframe/:id", name: "流程配置", component: _import("index/environment/mainframe")},
			{path: "/env", name: "环境配置", component: _import("index/environment/env/index")},
			{path: "/host/:id", name: "主机列表页面", component: _import("index/environment/mainframe")},
			{path: "/host/:id/:hostId", name: "主机详情", component: _import("index/environment/host")},
			{
				path: "/area/:id", name: "区域", component: _import("index/area/index"),
				children: [
					{path: "/area/:id/workloads", name: "载荷", component: _import("index/area/workloads/index")},
					{path: "/area/:id/deployments", name: "部署", component: _import("index/area/deployments/index")},
					{path: "/area/:id/deployments/:name", name: "部署详情", component: _import("index/area/deployments/info")},
					{path: "/area/:id/pods", name: "容器组", component: _import("index/area/prod/index")},
					{path: "/area/:id/pods/:name", name: "容器组详情", component: _import("index/area/prod/info")},
					{path: "/area/:id/replicaset", name: "文本复制器", component: _import("index/area/replicaset/index")},
					{path: "/area/:id/replicaset/:name", name: "文本复制器详情", component: _import("index/area/replicaset/info")},
					{path: "/area/:id/services", name: "服务", component: _import("index/area/services/index")},
					{path: "/area/:id/services/:name", name: "服务详情", component: _import("index/area/services/info")},
				]
			},
			{
				path:"/addhost/:id",
				name:"添加主机",
				component:_import("index/environment/add_host")
			},
			{
				path:"/containerApp/:id",
				name:"部署容器应用",
				component:_import("index/environment/containerApp")
			}

		]
	}
];

export default new Router({
	// mode: 'history', //后端支持可开
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
});

export const asyncRouterMap = [];
