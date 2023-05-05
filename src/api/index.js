import {
	myRequest
} from '../utils/request.js'

export function userLogin(data) {
  return myRequest({
		url: '/login',
		method: 'post',
		data
	})
}