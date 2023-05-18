<template>
  <view class="change-password">
    <uni-forms
      ref="psdForm"
      :modelValue="changePsdFormData"
    >
      <uni-forms-item name="account">
        <uni-easyinput
          type="text"
          v-model="changePsdFormData.account"
          maxlength="11"
          placeholder="请输入手机号"
        />
      </uni-forms-item>
      <uni-forms-item name="oldPassword">
        <uni-easyinput
          v-model="changePsdFormData.oldPassword"
          type="password"
          placeholder="请输入密码"
        />
      </uni-forms-item>
      <uni-forms-item name="newPassword">
        <uni-easyinput
          v-model="changePsdFormData.newPassword"
          type="password"
          placeholder="请输入密码"
        />
      </uni-forms-item>
      <button class="changeBtn" @click="handleChange">修改</button>
    </uni-forms>
  </view>
</template>

<script setup>
import { reactive } from "vue";
import { updatePassword } from '../../api/index.js'
const changePsdFormData = reactive({
  account: '',
  oldPassword: '',
  newPassword: ''
})
const handleChange = async() => {
  const { data: res } = await updatePassword(changePsdFormData)
}
</script>

<style lang="scss">
  .change-password {
    .uni-easyinput {
      background-color: #ebd8d8;
      width: 90%;
      margin: 0 auto;
      // height: 80rpx;
      border-radius: 20rpx;
      ::v-deep .uni-easyinput__content-input {
        height: 90rpx;
      }
    }
    .changeBtn {
      width: 90%;
      margin: 0 auto;
      color: white;
      background-image: linear-gradient(90deg, #f1e1e4 -8%, #debe76 92%);
      &::after {
        border-color: transparent !important;
      }
    }
  }
</style>