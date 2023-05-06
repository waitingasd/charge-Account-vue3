import {
	myRequest
} from '../utils/request.js'

// 用户登录
export function userLogin(data) {
  return myRequest({
		url: '/login',
		method: 'post',
		data
	})
}

// 用户信息
export function getUserInfo() {
  return myRequest({
		url: '/getUserInfo',
		method: 'get'
	})
}