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

// 注销账号
export function deleteAccount(params) {
  return myRequest({
		url: '/deleteAccount',
		method: 'get',
		params
	})
}

// 注册账号
export function registUser(data) {
  return myRequest({
		url: '/registUser',
		method: 'post',
		data
	})
}

// 修改个人信息
export function updateUserInfo(data) {
  return myRequest({
		url: '/updateUserInfo',
		method: 'post',
		data
	})
}

// 修改密码
export function updatePassword(data) {
  return myRequest({
		url: '/updatePassword',
		method: 'get',
		data
	})
}