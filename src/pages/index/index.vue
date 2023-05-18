<template>
  <view class="content">
    <view class="final-detail">
      <view class="balance">
        <p>3月结余</p>
        <p>{{ 0 }}</p>
      </view>
      <view class="details">
        <view class="income">收入</view> 
        <view>0</view> 
        <view>|</view>
        <view class="income spend">支出</view> 
        <view>0</view> 
      </view>
    </view>
    <view class="add" @click="handleAddRecord">
      <img src="../../static/home/add.png" />
    </view>
  </view>
</template>

<script setup>
  const handleAddRecord = () => {
    uni.navigateTo({
        url: '/pages/record/index'
      })
  }
</script>

<style lang="scss">
.content {
  .final-detail {
    width: 90%;
    background-color: #ffffff;
    margin: 0 auto;
    border-radius: 16rpx;
    .balance {
      p:first-child {
        font-size: 15px;
        padding-top: 50rpx;
        padding-left: 30rpx;
      }
      p:last-child {
        font-size: 17px;
        padding-left: 30rpx;
        padding-top: 10rpx;
        font-weight: 700;
      }
    }
    .details {
      display: flex;
      padding-left: 30rpx;
      padding-top: 30rpx;
      padding-bottom: 30rpx;
      uni-view {
        margin-right: 20rpx;
      }
      .income {
        border-radius: 16rpx;
        background-color: rgb(127, 196, 127);
        color: white;
        width: 18%;
        font-size: 15px;
        height: 50rpx;
        line-height: 48rpx;
        text-align: center;
        &.spend {
          background-color: pink;
        }
      }
    }
  }
  .add {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    box-shadow: 0rpx 0rpx 15rpx 15rpx rgba(235, 164, 181, 0.4);
    position: absolute;
    z-index: 99999;
    bottom: 180rpx;
    right: 20rpx;
    img {
      width: 100rpx;
      height: 100rpx;
    }
  }
}
</style>
