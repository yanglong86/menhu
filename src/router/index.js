import Vue from "vue";
import Router from "vue-router";

const _import = require("./_import_" + process.env.NODE_ENV);
Vue.use(Router);
export const constantRouterMap = [
	{
		path: '/',
		component: _import("index/index"),
		children: [
			{
				path: "/",
				component: _import("index/home/index"),
				name: "首页",
				
			},
			{
				path: "/aboutme",
				component: _import("index/aboutme/index"),
				name: "关于我们"
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
