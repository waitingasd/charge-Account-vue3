import { createStore } from 'vuex';

export default createStore({
  state: {
    charge_token: ''
  },
  mutations: {
		SET_TOKEN(state, payload) {
			state.charge_token = payload
			uni.setStorage({
				key: 'charge_token',
				data: payload
			})
		},
		REMOVE_TOKEN(state) {
			state.charge_token = ''
			uni.removeStorage({
				key: 'charge_token'
			})
		}
  },
  actions: {

  },
  getters: {
		charge_token() {
			try {
				const value = uni.getStorageSync('charge_token');
				if (value) {
					return value
				} else {
					return ''
				}
			} catch (e) {
				return ''
			}
		}
  }
})