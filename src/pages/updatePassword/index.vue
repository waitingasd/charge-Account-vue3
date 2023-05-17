<template>
  <view class="change-password">
    <uni-forms
      ref="form"
      :modelValue="formData"
      :rules="rules"
    >
      <uni-forms-item name="name">
        <uni-easyinput
          class="input-form"
          type="text"
          v-model="formData.name"
          maxlength="11"
          placeholder="请输入手机号"
          style="margin-top: 50rpx"
          :style="styles"
        />
      </uni-forms-item>
      <uni-forms-item name="password">
        <uni-easyinput
          class="input-form"
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
          :style="styles"
        />
      </uni-forms-item>
    </uni-forms>
  </view>
</template>

<script>
export default {

}
</script>

<style>

</style>