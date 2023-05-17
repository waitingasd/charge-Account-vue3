<template>
  <view class="mine-userInfo">
    <view class="info-row" style="padding-top: 10px">
      <img class="headPic" src="../../static/mine/no-head.png" alt="" />
      <view class="right-text">更换头像</view>
    </view>
    <view class="info-row">
      <view class="right-text">昵称</view>
      <view class="right-text">
        <span v-if="!showNameInputEdit">{{ userInfo.username ? userInfo.username : `用户${ userInfo.phone }`}}</span>
        <img v-if="!showNameInputEdit" class="edit" src="../../static/mine/edit.png" @click="toEdit('name')" alt="" />
        <uni-easyinput
          type="text"
          v-if="showNameInputEdit"
          v-model="editInfo.username"
          :placeholder="userInfo.username"
          style="text-align: center"
          :clearable="false"
          @blur="handleEdit(editInfo.username, 'name')"
        />
    </view>
    </view>
    <view class="info-row">
      <view class="right-text">手机</view>
      <view class="right-text">
        <span v-if="!showPhoneInputEdit">{{ userInfo.phone ? userInfo.phone : '未绑定' }}</span>
        <img v-if="!showPhoneInputEdit" class="edit" src="../../static/mine/edit.png" @click="toEdit('phone')" alt="" />
        <uni-easyinput
          type="text"
          v-if="showPhoneInputEdit"
          v-model="editInfo.phone"
          :placeholder="userInfo.phone"
          style="text-align: center"
          :clearable="false"
          @blur="handleEdit(editInfo.phone, 'phone')"
        />
      </view>
    </view>
    <view class="info-row" @blur="handleEdit('', 'email')">
      <view class="right-text">邮箱</view>
      <view class="right-text">
        <span v-if="!showEmailInputEdit">{{ userInfo.email ? userInfo.email : '未绑定' }}</span>
        <img v-if="!showEmailInputEdit" class="edit" src="../../static/mine/edit.png" @click="toEdit('email')" alt="" />
        <uni-easyinput
          type="text"
          v-if="showEmailInputEdit"
          v-model="editInfo.email"
          :placeholder="userInfo.email"
          style="text-align: center"
          :clearable="false"
          @blur="handleEdit(editInfo.email, 'email')"
        />
      </view>
    </view>
    <view class="info-row" @click="toChangePassword">
      <view class="right-text">修改密码</view>
      <img class="icon" src="../../static/mine/xiayiye.png" alt="" />
    </view>
    <view class="operate-btn" @click="delAcount">注销账号</view>
    <view class="operate-btn" @click="logout">退出登录</view>
  </view>
</template>

<script setup>
import { getUserInfo, deleteAccount, updateUserInfo } from '../../api/index.js'
import { useStore } from 'vuex';
import { ref } from 'vue';
    const props = defineProps(['userInfo'])
    const userInfo = props.userInfo
    const store = useStore()
    const showNameInputEdit = ref(false) // 是否展示昵称编辑框
    const showPhoneInputEdit = ref(false) // 是否展示电话编辑框
    const showEmailInputEdit = ref(false) // 是否展示邮箱编辑框
    const emit = defineEmits(['showForm'])
    const editInfo = ref({ // 编辑用户信息
      username: '', // 昵称
      phone: '', // 电话
      email: '', // 邮箱
      type: ''
    })
    const delAcount = async() => {
      const { data: res } = await deleteAccount()
      if (res?.code === 0) {
        store.commit('REMOVE_TOKEN')
        emit('showForm', false)
      }
    }
    const logout = () => {
      store.commit('REMOVE_TOKEN')
      emit('showForm', false)
    }
    const toEdit = (str) => {
      if (str === 'name') {
        showNameInputEdit.value = true
      }
      if (str === 'phone') {
        showPhoneInputEdit.value = true
      }
      if (str === 'email') {
        showEmailInputEdit.value = true
      }
    }
    const handleEdit = async(val, str) => {
      editInfo._value.type = str
      if (str === 'name') {
        showNameInputEdit.value = false
        if (val !== '') {
          editInfo._value.username = val
          const {data:res} = await updateUserInfo(editInfo._value)
          if (res?.code === 0) userInfo.username = editInfo._value.username
        }
        return
      }
      if (str === 'phone') {
        showPhoneInputEdit.value = false
        if (val !== '') {
          editInfo._value.phone = val
          const {data:res} = await updateUserInfo(editInfo._value)
          if (res?.code === 0) userInfo.phone = editInfo._value.phone
        }
        return
      }
      if (str === 'email') {
        showEmailInputEdit.value = false
        if (val !== '') {
          editInfo._value.email = val
          const {data:res} = await updateUserInfo(editInfo._value)
          if (res?.code === 0) userInfo.email = editInfo._value.email
        }
        return
      }
    }
    const toChangePassword = () => {
      uni.navigateTo({
        url: '/pages/updatePassword/index'
      })
    }
</script>

<style lang="scss">
  .mine-userInfo {
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20rpx 20rpx;
      border-radius: 16rpx;
      background-color: rgba(232, 219, 226);
      cursor: pointer;
      .headPic {
        width: 150rpx;
        height: 150rpx;
        padding: 10rpx 30rpx;
      }
      .icon {
        width: 50rpx;
        height: 50rpx;
        padding: 10rpx 30rpx;
      }
      .right-text {
        padding: 40rpx 30rpx;
        text-align: center;
        .edit {
          width: 30rpx;
          height: 30rpx;
        }
      }
    }
    .operate-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20rpx 20rpx;
      border-radius: 16rpx;
      background-color: rgba(232, 219, 226, 0.6);
      text-align: center;
      padding: 35rpx 30rpx;
    }
  }
</style>