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
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
const goBack = () => {
	uni.navigateBack({
		delta:1, //返回层数，2则上上页
	})
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
      margin-right: 20%;
    }
    .tab-select {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 35%;
      font-size: 32rpx;
      font-weight: 700;
      cursor: pointer;
      .txt {
        position: relative;
				&.active {
          color: #eba4b5;
          &::after {
            content: "";
            position: absolute;
            width: 70rpx;
            height: 10rpx;
            border-radius: 30rpx;
            background-color: #eba4b5;
						top: 52rpx;
						left: 0rpx;
          }
				}
      }
    }
  }
}
</style>
