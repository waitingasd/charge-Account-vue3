<template>
  <view class="mine-userInfo">
    <view class="info-row">
      <img src="../../static/mine/no-head.png" alt="" />
      <view class="right-text">更换头像</view>
    </view>
    <view class="info-row">
      <view class="right-text">昵称</view>
      <view class="right-text">{{ userInfo.username ? userInfo.username : `用户${ userInfo.phone }`}}</view>
    </view>
    <view class="info-row">
      <view class="right-text">手机</view>
      <view class="right-text">{{ userInfo.phone ? userInfo.phone : '未绑定' }}</view>
    </view>
    <view class="info-row">
      <view class="right-text">邮箱</view>
      <view class="right-text">{{ userInfo.email ? userInfo.email : '未绑定' }}</view>
    </view>
    <view class="info-row">
      <view class="right-text">修改密码</view>
      <img class="icon" src="../../static/mine/xiayiye.png" alt="" />
    </view>
    <view class="operate-btn" @click="delAcount">注销账号</view>
    <view class="operate-btn" @click="logout">退出登录</view>
  </view>
</template>

<script setup>
import { getUserInfo, deleteAccount } from '../../api/index.js'
import { useStore } from 'vuex';
// import { ref, defineEmits } from 'vue' 
// export default {
  // props: ['userInfo'],
  // setup(props) {
    const props = defineProps(['userInfo'])
    const userInfo = props.userInfo
    const store = useStore()
    const emit = defineEmits(['showForm'])
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
    // return { userInfo, delAcount }
//   }
// }
</script>

<style lang="scss">
  .mine-userInfo {
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20rpx 20rpx;
      border-radius: 16rpx;
      background-color: #969494;
      cursor: pointer;
      img {
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
      }
    }
    .operate-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20rpx 20rpx;
      border-radius: 16rpx;
      background-color: #969494;
      text-align: center;
      padding: 35rpx 30rpx;
    }
  }
</style>