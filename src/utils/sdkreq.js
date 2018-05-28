import axios from 'axios'

export const tokenKey = 'authorization';
var load = {};
// 创建axios实例
var service = axios.create({
	baseURL: process.env.BASE_API, // api的base_url
	timeout: 5000, // 请求超时时间
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'authorization': window.location.search.split('&')[0].replace('?', '')
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
				'Content-Type': 'application/json;charset=utf-8',
				'authorization': token
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
				let code = response.data.rtnCode,
					sData = {
						message: response.data.rtnMsg,
						data: response.data.body
					},
					eData = {message: response.data.rtnMsg, data: null},
					bufferParam = 0;
				
				
				/***
				 * @bufferParam  0  结果OK  类型  前台正常显示
				 * @bufferParam  1  结果Err 类型  前台直接显示错误
				 * @bufferParam  2+ 结果Err 类型 前台需要执行指定的业务
				 *                     20 跳转登录页面
				 * ***/
				
				if (code.length === 3) {
					bufferParam = 1;
					eData.message = "系统故障，请稍后访问"
				}
				
				if (code.length === 4) {
					
					if (code[0] === '3') {
						bufferParam = 20;
					} else {
						bufferParam = 1;
					}
				}
				
				if (code.length === 6) {
					if (code === '000000') {
						bufferParam = 0;
					}
					
					if (code === '999999') {
						bufferParam = 1;
					}
				}
				
				switch (bufferParam) {
					case 0:
						resolve(sData);
						break;
					case 1:
						reject(sData);
						break;
					case 20:
						window.location.href = `${process.env.BASE_API}/login`;
						break;
					default:
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
