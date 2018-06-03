import axios from 'axios'

export const tokenKey = 'authorization';
var load = {};
// 创建axios实例
var service = axios.create({
	baseURL: process.env.BASE_API, // api的base_url
	timeout: 5000, // 请求超时时间
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	},
	transformRequest: [function (data) {
		data = JSON.stringify(data);
		return data;
	}],
	withCredentials: true
});


//请求函数
const sdk = function (url, methods, data, token) {
	if (url === null && methods === null && data === null && token) {
		service = axios.create({
			baseURL: process.env.BASE_API, // api的base_url
			timeout: 5000, // 请求超时时间
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			transformRequest: [function (data) {
				data = JSON.stringify(data);
				return data;
			}],
			withCredentials: true
		});
		return;
	}
	
	let met = methods || 'get';
	met = met.toLowerCase();
	
	return new Promise((resolve, reject) => {
		let newUrl = url;
		if ((met === "get" || met === "delete") && data != null) {
			let arr = [];
			for (var x in data) {
				arr.push(x + "=" + data[x]);
			}
			newUrl = newUrl + "?" + arr.join("&");
		}
		// service.defaults.headers.common['token'] = 'AUTH_TOKEN';
		
		load = this.$loading({
			lock: true,
			text: '正在请求后台',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0)'
		});
		
		service[met](newUrl, data)
			.then(function (response) {
				load.close();
				let code = response.data.code,
					sData = {
						data: response.data.data
					};
				
				if (code === 20000) {
					resolve(sData);
				} else {
					reject(sData);
				}
				
			}, function (err) {
				load.close();
				console.log(err)
				reject(err);
			})
			.catch(function (err) {
				load.close();
				console.log(err)
				reject(err);
			});
	});
}

export default sdk
