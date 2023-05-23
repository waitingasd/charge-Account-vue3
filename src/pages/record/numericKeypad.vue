<template>
  <view class="key-pad">
    <view class="row">
      <view class="row-item" @click="checkNumber(1)">1</view>
      <view class="row-item" @click="checkNumber(2)">2</view>
      <view class="row-item" @click="checkNumber(3)">3</view>
      <view class="row-item">
        <img class="delete-img" src="../../static/numberKeypad/delete.png" />
      </view>
    </view>
    <view class="row">
      <view class="row-item" @click="checkNumber(4)">4</view>
      <view class="row-item" @click="checkNumber(5)">5</view>
      <view class="row-item" @click="checkNumber(6)">6</view>
      <view class="row-item">+</view>
    </view>
    <view class="row">
      <view class="row-item" @click="checkNumber(7)">7</view>
      <view class="row-item" @click="checkNumber(8)">8</view>
      <view class="row-item" @click="checkNumber(9)">9</view>
      <view class="row-item">-</view>
    </view>
    <view class="row">
      <view class="row-item">.</view>
      <view class="row-item" @click="checkNumber(0)">0</view>
      <view class="row-item">AC</view>
      <view class="row-item">
        <view class="finish">完成</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .key-pad {
    width: 100%;
    // margin-left: 2.5%;
    flex-direction: column;
    display: flex;
    position: absolute;
    bottom: 0px;
    background-color: white;
    // box-shadow: 0px 0px 10rpx 10rpx #eec6d0;
    border-radius: 10rpx;
    .row {
      display: flex;
      justify-content: space-around;
      text-align: center;
      align-items: center;
      margin-bottom: 10rpx;
      .row-item {
        width: 25%;
        height: 150rpx;
        line-height: 150rpx;
        margin-right: 10rpx;
        background-color: #f7d2db;
        border-radius: 10rpx;
        .delete-img {
          width: 60rpx;
          height: 60rpx;
          margin-top: 45rpx;
          // text-align: center;
        }
        .finish {
          background-color: #f3b369;
          font-size: 42rpx;
          font-weight: 700;
        }
        &:last-child {
          margin-right: -10rpx;
        }
      }
      &:last-child {
        margin-bottom: -10rpx;
      }
    }
  }
</style>