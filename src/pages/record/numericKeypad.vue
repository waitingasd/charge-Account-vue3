<template>
  <view class="key-pad" @click.stop="handleClick">
    <view class="reload">
        <uni-datetime-picker
          type="datetime"
          v-model="obj.datetimesingle"
          style="background-color: #f0f0f0;"
        />
      <uni-easyinput
        type="text"
        v-model="obj.remark"
        placeholder="点击输入备注..."
        :clearable="false"
        style="background-color: #f0f0f0;"
      />
    </view>
    <view class="row">
      <view class="row-item" data-num="1">1</view>
      <view class="row-item" data-num="2">2</view>
      <view class="row-item" data-num="3">3</view>
      <view class="row-item" data-num="D">
        <img class="delete-img" src="../../static/numberKeypad/delete.png" />
      </view>
    </view>
    <view class="row">
      <view class="row-item" data-num="4">4</view>
      <view class="row-item" data-num="5">5</view>
      <view class="row-item" data-num="6">6</view>
      <view class="row-item" data-num="+">+</view>
    </view>
    <view class="row">
      <view class="row-item" data-num="7">7</view>
      <view class="row-item" data-num="8">8</view>
      <view class="row-item" data-num="9">9</view>
      <view class="row-item" data-num="-">-</view>
    </view>
    <view class="row">
      <view class="row-item" data-num=".">.</view>
      <view class="row-item" data-num="0">0</view>
      <view class="row-item" data-num="AC">AC</view>
      <view class="row-item">
        <view v-if="obj.isFinishBtnShow" class="finish" data-num="F">完成</view>
        <view v-else class="finish" data-num="C">=</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, toRefs } from "vue"
import { add, subtraction } from '../../utils/bigNumber.js'
  const emit = defineEmits(['sendResult', 'sendSecondResult', 'sendOperate', 'sendSumResult'])
  const obj = reactive({
    result: '',
    isFinishBtnShow: true,
    addCanClick: true,
    minusCanClick: true,
    isFirst: true, // 是否是第一个数
    datetimesingle: '',
    remark: ''
  })
  const handleClick = (e) => {
    const num = e.target.dataset.num
    if (!num) return
    switch (num) {
      case 'D':
      handleOperate('delete')
      break;
      case 'AC':
      handleOperate('clear')
      break;
      case 'C':
      handleOperate('calculate')
      break;
      case 'F':
      handleOperate('finish')
      break;
      default:
      checkNumber(num)
    }
  }
  const checkNumber = (num) => {
    if (obj.result === '' && num === '.') {
      obj.result = '0'
    }
    if (obj.result === '0' && num !== '.') {
      obj.result = Number(obj.result + num)
      emit('sendResult', obj.result)
      return
    }
    if (obj.result === '' && (num === '+' || num === '-')) return
    if (num === '+' || num === '-') obj.isFinishBtnShow = false
    const lastStr = String(obj.result).substr(-1)
    if ((num === '+' && lastStr === '+' )|| (num === '-' && lastStr === '-')) {
      return
    }
    if ((num === '+' && lastStr === '-') || (num === '-' && lastStr === '+')) {
      obj.result = String(obj.result).substring(0, String(obj.result).length -1) + num
    } else {
      obj.result = obj.result + num
    }
    emit('sendResult', obj.result)
  }
  const handleOperate = (type) => {
    if (type === 'delete') {
      obj.result = String(obj.result).substring(0, String(obj.result).length -1)
      emit('sendResult', obj.result)
      if (obj.result === '') {
        obj.isFinishBtnShow = true
      }
      return
    }
    if (type === 'calculate') {
      obj.isFinishBtnShow = true
      obj.result = eval(obj.result)
      emit('sendResult', obj.result)
      return
    }
    if (type === 'clear') {
      obj.result = ''
      emit('sendResult', obj.result)
      return
    }
    if (type === 'finish') {
      uni.switchTab({
        url: '/pages/index/index'
      })
      return
    }
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
    background-color: #f0f0f0;
    // box-shadow: 0px 0px 10rpx 10rpx #eec6d0;
    border-radius: 10rpx;
    .reload {
      display: flex;
      align-items: center;
      width: 100%;
      ::v-deep .uni-date-x {
        background-color: #f0f0f0;
      }
      .uni-easyinput__placeholder-class {
        font-size: 28rpx;
      }
      ::v-deep .uni-easyinput__content-input {
        height: 60rpx;
      }
    }
    .row {
      display: flex;
      justify-content: space-around;
      text-align: center;
      align-items: center;
      margin-bottom: 10rpx;
      .row-item {
        width: 25%;
        height: 130rpx;
        line-height: 130rpx;
        font-size: 40rpx;
        // color: white;
        margin-right: 10rpx;
        background-color: white;
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
        margin-bottom: 0rpx;
      }
      &:first-child {
        margin-top: 10rpx;
      }
    }
  }
</style>