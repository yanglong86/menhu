const deployments = [
	{label: 'Name',prop:'name',list:false},
	{label: 'Namespace',prop:'namespace',list:false},
	{label: 'Labels',prop:'labels',list:true},
	{label: 'Selector',prop:'selector',list:true},
	{label: 'Strategy',prop:'strategy',list:false},
	{label: 'Min ready seconds',prop:'minReadySeconds',list:false},
	{label: 'Revision history limit',prop:'revisionHistoryLimit',list:false},
	{label: 'Rolling update strategy',prop:'rollingUpdateStrategy',list:false},
	{label: 'Status',prop:'status',list:false},
];

const pods = [
	{label: '名称(Name)',prop:'name',list:false},
	{label: '名字空间(Namespace)',prop:'namespace',list:false},
	{label: '标签(Labels)',prop:'labels',list:true},
	{label: '注记(Annotations)',prop:'annotation',list:true},
	{label: '创建时间',prop:'timestamp',list:false},
	{label: 'Status',prop:'status',list:false},
	{label: 'Network',prop:'memoryUse',list:false},
	{label: 'Node',prop:'nodeName',list:false},
	{label: 'IP',prop:'iP',list:false},
];

const replicaset = [
	{label: '名称(Name)',prop:'name',list:false},
	{label: '名字空间(Namespace)',prop:'namespace',list:false},
	{label: '标签(Labels)',prop:'labels',list:true},
	{label: '注记(Annotations)',prop:'annotations',list:true},
	{label: '创建时间',prop:'creationTimestamp',list:false},
	{label: 'Status',prop:'pods',list:false},
	{label: 'Selector',prop:'selector',list:true},
	{label: 'Images',prop:'images',list:true}
];

const service = [
	{label: '名称(Name)',prop:'name',list:false},
	{label: '名字空间(Namespace)',prop:'namespace',list:false},
	{label: '标签(Labels)',prop:'labels',list:true},
	{label: '创建时间',prop:'creationTimestamp',list:false},
	{label: 'Label Selector',prop:'selector',list:true},
	{label: 'Connection Cluster IP',prop:'clusterIp',list:false},
	{label: 'Internal endpoints',prop:'internalEndpoint',list:true},
	{label: 'External endpoints',prop:'externalEndpoints',list:true},
];

export {
	deployments,
	pods,
	replicaset,
	service
}