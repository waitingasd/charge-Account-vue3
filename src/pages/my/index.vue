<template>
  <view class="page-mine">
    <view v-if="!isShowUserInfo" class="my-login">
      <uni-forms ref="form" :modelValue="formData" :rules="rules">
        <uni-forms-item label="账号" name="name">
          <uni-easyinput
            type="text"
            v-model="formData.name"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </uni-forms-item>
        <uni-forms-item label="密码" name="password">
          <uni-easyinput
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
          />
        </uni-forms-item>
      </uni-forms>
      <button class="btn" @tap="login">登录</button>
    </view>
    <view v-else class="my-info">
      <personal-center :userInfo="userInfo" />
    </view>
  </view>
</template>

<script>
import { reactive, ref, toRefs } from 'vue' 
import { userLogin, getUserInfo } from '../../api/index.js'
import { computed, watch } from '@vue/runtime-core'
import { useStore } from 'vuex';
import personalCenter from './personal-center.vue';
export default {
  components: { personalCenter },
  setup() {
    const store = useStore()
    const swe = reactive({
      userInfo: {},
      res: {}
    })
    const isShowUserInfo = ref(false)
    getUserInfo().then(res => {
      swe.res =computed(()=>{
        return res?.data?.data
      })
      if (swe.res) {
        if (store.getters.charge_token !== '') {
          isShowUserInfo.value = true
          swe.userInfo = swe.res
        }
      }
    })
    const formData = ref({
      name: '',
      password: ''
    })
    const rules = ref({
      account: {
        rules: [
          {
            required: true,
            errorMessage: '请输入用户名'
          }
        ]
      },
      password: {
        rules: [
          {
            required: true,
            errorMessage: '请输入正确的密码'
          }
        ]
      }
    })
    const login =  async() => {
      const { data:res } = await userLogin(formData._value)
      store.commit('SET_TOKEN', res?.token)
      isShowUserInfo.value = true
      getUserInfo().then(res => {
        swe.userInfo = res?.data?.data
      })
    }
    return { store, isShowUserInfo, formData, rules, login, ...toRefs(swe) }
  }
}
</script>

<style lang="scss">
  // .my-login {
  //   background-image: url(../../static/mybj.png);
  // }
</style>