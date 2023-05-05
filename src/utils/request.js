import baseUrl from './baseurl.js'
import store from '../store/index.js'
export const myRequest = (options) => { //传入的options是一个json对象
	//开发时使用本地接口，在上线时只需要修改此处接口为线上地址即可 "https://wycydn.zhuji.gov.cn:10443/api"
	// const BASE_URL = imageUrl.imageUrl + '/api';
	const BASE_URL = baseUrl;
	let isShowLoading = true
	return new Promise((resolve, reject) => {
		// 请求前开启loading
		// if (isShowLoading) {
		//   uni.showLoading({
		//     title: '加载中',
		//     mask: true
		//   })
		// }

		// let token = {'Authorization' :  uni.getStorageSync('token') || '',};
		const header = options.header || {}
		const phoneInfo = uni.getSystemInfoSync()
		// if(options.url==='/f/epro/common/verify/get/picture') {
		// 	header.Cookie = 'JSESSIONID=' + phoneInfo.deviceId
		// }
		header.Authorization = uni.getStorageSync('charge_token') || ''
		// console.log(token)
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || "GET",
			data: options.data || {},
			dataType: options.dataType || "json",
			header,

			success: (res) => {

				switch (res.data.code) {
					case 0:

						uni.showToast({
						title:res.data.msg,
						icon:"none"
						})
						break;
					// case 601:
					// 	uni.removeStorage({
					// 		key: 'charge_token',
					// 	})
					// 	uni.removeStorage({
					// 		key: 'userNameType',
					// 	})
					// 	uni.removeStorage({
					// 		key: 'userNameID',
					// 	})
					// 	// uni.navigateTo({
					// 	//  url: '/pages/my/login'
					// 	// });
					// 	const pages = getCurrentPages()
					// 	const page = pages.pop()
					// 	// page.onLoad()
					// 	break;
					// case 602:
					// 	uni.removeStorageSync('token');
					// 	if (!store.getters.staleDated) {
					// 		if (uni.getSystemInfoSync().platform == 'ios') {
					// 			uni.showModal({
					// 				title: '提示',
					// 				showCancel: false,
					// 				content: '该账号已在其他设备登陆，是否重新登录',
					// 				success: function(res) {
					// 					if (res.confirm) {
					// 						uni.navigateTo({
					// 							url: '/pages/login/new-index'
					// 						});
					// 					}
					// 				}
					// 			});
					// 		} else if (uni.getSystemInfoSync().platform == 'android') {
					// 			uni.showModal({
					// 				title: '提示',
					// 				cancelText: '确定',
					// 				confirmText: '取消',
					// 				content: '该账号已在其他设备登陆，是否重新登录',
					// 				success: function(res) {
					// 					if (res.confirm) {
					// 						plus.runtime.quit();
					// 					} else if (res.cancel) {
					// 						uni.navigateTo({
					// 							url: '/pages/login/new-index'
					// 						});
					// 					}
					// 				}
					// 			});
					// 		}
					// 	}
					// 	store.commit('isStaleDated', true)
					// 	break;
					default:
						console.log(res.data.msg)
						uni.showToast({
							title: res.data.msg,
							duration: 1500,
							icon: "none"
						});
				}
				resolve(res)
				// console.log(res)


			},
			fail: (err) => {
				uni.showToast({
					title: "请求失败，请检查网络连接",
					icon: 'none'
				})
				reject(err)
			}
		})
	})
}
