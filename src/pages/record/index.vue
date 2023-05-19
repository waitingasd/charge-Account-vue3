<template>
  <view class="page-record">
    <view class="top-nav">
      <img src="../../static/back.png" alt="" @click="goBack"/>
      <view class="tab-select">
        <view
          class="txt"
          :class="isExpendShow ? 'active' : ''"
          @click="changeActiveTab(0)"
          >支出</view
        >
        <view
          class="txt"
          :class="isIncomeShow ? 'active' : ''"
          @click="changeActiveTab(1)"
          >收入</view
        >
        <view class="type_item">
          {{ selectedType }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
const goBack = () => {
  uni.navigateTo({
    url: '/pages/index/index'
  })
	// uni.navigateBack({
	// 	delta:1, //返回层数，2则上上页
	// })
}
const isExpendShow = ref(false); // 是否展示支出
const isIncomeShow = ref(false); // 是否展示收入
const changeActiveTab = (flag) => {
  if (flag === 0) {
    isExpendShow.value = true;
    isIncomeShow.value = false;
  }
  if (flag === 1) {
    isIncomeShow.value = true;
    isExpendShow.value = false;
  }
};
</script>

<style lang="scss">
.page-record {
  .top-nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 60rpx;
      height: 60rpx;
			margin-left: 20rpx;
			margin-top: 20rpx;
      margin-right: 25%;
    }
    .tab-select {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 50%;
      font-size: 32rpx;
      font-weight: 700;
      cursor: pointer;
      .txt {
        position: relative;
        margin-top: 20rpx;
				&.active {
          background-color: #eba4b5;
          color: white;
          width: 108rpx;
          height: 55rpx;
          border-radius: 32rpx;
          line-height: 55rpx;
          text-align: center;
				}
      }
    }
  }
}
</style>
