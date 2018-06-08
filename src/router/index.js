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
				name: "关于我们",
				children: [
					{path: "/aboutme/aboutme", component: _import("index/aboutme/commponets/aboutme"), name: "关于我们"},
					{path: "/aboutme/linkme", component: _import("index/aboutme/commponets/linkme"), name: "联系我们"},
					{path: "/aboutme/zifei", component: _import("index/aboutme/commponets/zifei"), name: "收费标准"},
					{path: "/aboutme/fenkong", component: _import("index/aboutme/commponets/fenkong"), name: "风控规则"},
					{path: "/aboutme/zijing", component: _import("index/aboutme/commponets/zijing"), name: "资金相关"},
					{path: "/aboutme/gonggao", component: _import("index/commponets/pingtai_gonggao"), name: "平台公告"},
				],
				redirect:'/aboutme/aboutme'
			},
			{
				path: "/zixun",
				component: _import("index/zixun/index"),
				name: "财经资讯"

			},
			{path: "/zixun/:id", component: _import("index/zixun/detail"), name: "财经资讯详情"},
			{path: "/gonglv", component: _import("index/gonglv/gonglv"), name: "攻略"}
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
