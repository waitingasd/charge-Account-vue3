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
    <view class="type_item">
      <!-- {{ selectedType }} -->
      <view class="selected_type">房租水电</view>
      <view class="show_result">{{ obj.showResult }}</view>
    </view>
    <view class="type_list">
      <view class="item">房租水电</view>
      <view class="item">餐饮日常</view>
      <view class="item">居家日常</view>
      <view class="item">购物消费</view>
      <view class="item">医疗药品</view>
      <view class="item">+</view>
    </view>
    <view>
    </view>
    <numeric-keypad
      @sendResult="getResult"
      @sendOperate="getOperate"
      @sendSecondResult="getSecondResult"
    />
  </view>
</template>

<script setup>
import numericKeypad from './numericKeypad.vue'
import { reactive, ref } from "vue";
const goBack = () => {
  uni.switchTab({
    url: '/pages/index/index'
  })
	// uni.navigateBack({
	// 	delta:1, //返回层数，2则上上页
	// })
}
const obj = reactive({
  numResult: '',
  operateType: '',
  secondResult: '',
  showResult: ''
})
const isExpendShow = ref(true); // 是否展示支出
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
const getResult = (val) => {
  obj.numResult = val
  obj.showResult = obj.numResult + obj.operateType + obj.secondResult
}
const getOperate = (val) => {
  obj.operateType = val
  obj.showResult = obj.numResult + obj.operateType + obj.secondResult
}
const getSecondResult = (val) => {
  obj.secondResult = val
  obj.showResult = obj.numResult + obj.operateType + obj.secondResult
}
</script>

<style lang="scss">
page {
  background-color: #f6f6f6;
}
.page-record {
  .top-nav {
    width: 100%;
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
      width: 40%;
      font-size: 32rpx;
      font-weight: 700;
      cursor: pointer;
      .txt {
        position: relative;
        margin-top: 20rpx;
				&.active {
          background-color: #eba4b5;
          color: white;
          width: 120rpx;
          height: 65rpx;
          border-radius: 32rpx;
          line-height: 65rpx;
          text-align: center;
          font-size: 36rpx;
				}
      }
    }
  }
  .type_item {
    width: 95%;
    height: 300rpx;
    margin: 20rpx auto;
    border-radius: 30rpx;
    background-color: rgb(247, 210, 219);
    box-shadow: 0px 0px 10rpx 10rpx hsla(344, 30%, 88%, 0.712);
    .selected_type {
      padding-top: 50rpx;
      padding-left: 20rpx;
      font-size: 46rpx;
    }
    .show_result {
      font-weight: bold;
      text-align: right;
      font-size: 52rpx;
      padding-top: 70rpx;
      padding-right: 50rpx;
    }
  }
  .type_list {
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .item {
      width: 150rpx;
      height: 50rpx;
      line-height: 50rpx;
      margin-top: 10rpx;
      margin-right: 28rpx;
      color: white;
      text-align: center;
      border-radius: 12rpx;
      font-size: 32rpx;
      background-color: #f5c896;
    }
  }
}
</style>
