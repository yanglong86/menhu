/*
* @Name 表示点击该栏目需要跳转
* @action 表示是一个操作框
* @list  表示用列表格式展现
* @actionList 操作列表
* 	met 请求方式
* 	key val 传的值 目前只支持一个
*   sengdata 从列表对象中取值， key 代表请求的key, val是列表对象的key
*
*
* */

const deployments = [
	{label: 'Name', prop: 'name', list: false},
	{label: 'Labels', prop: 'labels', list: true},
	{label: 'Pods', prop: 'pods', list: false},
	{label: 'Age(天)', prop: 'timestamp', list: false},
	{label: 'Images', prop: 'images', list: true}
];

const pods = [
	{label: 'Name', prop: 'name', list: false},
	{label: 'Status', prop: 'status', list: false},
	{label: 'Restarts', prop: 'restarts', list: false},
	{label: 'Age(天)', prop: 'created', list: false},
	{label: 'CPU(cores)', prop: 'cpuCore', list: false},
	{label: 'Memory(bytes)', prop: 'memoryUse', list: false}
];

const replicaset = [
	{label: 'Name', prop: 'name', list: false},
	{label: 'Labels', prop: 'labels', list: true},
	{label: 'Pods', prop: 'pods', list: false},
	{label: 'Age(天)', prop: 'created', list: false},
	{label: 'Images', prop: 'images', list: true}
];

const service = [
	{label: 'Name', prop: 'name', list: false},
	{label: 'Labels', prop: 'labels', list: true},
	{label: 'Cluster IP', prop: 'clusterIp', list: false},
	{label: 'Internal endpoints', prop: 'internalEndpoint', list: true},
	{label: 'External endpoints', prop: 'externalEndpoints', list: true},
	{label: 'Age(天)', prop: 'creationTimestamp', list: false}
];

const 环境管理 = [
	{label: '状态', prop: 'state', list: false},
	{label: '名称', prop: 'name', list: false},
	{label: '模板', prop: 'orchestration', list: false},
	{label: '编排', prop: 'orchestration', list: false},
	{
		label: '操作', prop: 'action', list: false, actionList: [
			{icon: 'stop', title: '开始', key: 'state', val: 'activate', met: "put", sendData: {'id': 'id'}},
			{icon: 'start', title: '暂停', key: 'state', val: 'deactivate', met: "put", sendData: {'id': 'id'}},
			{icon: 'k8sdel', title: '删除', key: 'state', val: 'delete', met: "put", sendData: {'id': 'id'}}
		]
	}
];

export {
	deployments,
	pods,
	replicaset,
	service,
	环境管理
}