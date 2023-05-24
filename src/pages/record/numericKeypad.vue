<template>
  <view class="key-pad">
    <view class="row">
      <view class="row-item" @click="checkNumber(1, obj.isFirst)">1</view>
      <view class="row-item" @click="checkNumber(2, obj.isFirst)">2</view>
      <view class="row-item" @click="checkNumber(3, obj.isFirst)">3</view>
      <view class="row-item" @click="handleOperate('delete', obj.canClick)">
        <img class="delete-img" src="../../static/numberKeypad/delete.png" />
      </view>
    </view>
    <view class="row">
      <view class="row-item" @click="checkNumber(4, obj.isFirst)">4</view>
      <view class="row-item" @click="checkNumber(5, obj.isFirst)">5</view>
      <view class="row-item" @click="checkNumber(6, obj.isFirst)">6</view>
      <view class="row-item" @click="handleOperate('add', obj.canClick)">+</view>
    </view>
    <view class="row">
      <view class="row-item" @click="checkNumber(7, obj.isFirst)">7</view>
      <view class="row-item" @click="checkNumber(8, obj.isFirst)">8</view>
      <view class="row-item" @click="checkNumber(9, obj.isFirst)">9</view>
      <view class="row-item" @click="handleOperate('minus', obj.canClick)">-</view>
    </view>
    <view class="row">
      <view class="row-item" @click="checkNumber('.', obj.isFirst)">.</view>
      <view class="row-item" @click="checkNumber(0, obj.isFirst)">0</view>
      <view class="row-item">AC</view>
      <view class="row-item">
        <view v-if="obj.isFinishBtnShow" class="finish">完成</view>
        <view v-else class="finish" @click="handleOperate('finish', obj.canClick)">=</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, toRefs } from "vue"
import { add, subtraction } from '../../utils/bigNumber.js'
  const emit = defineEmits(['sendResult', 'sendSecondResult', 'sendOperate'])
  const props = defineProps(['showResult'])
  const showResult = props.showResult
  const obj = reactive({
    result: '',
    secondResult: '',
    isFinishBtnShow: true,
    operateType: '',
    sumResult: '',
    canClick: false,
    isFirst: true // 是否是第一个数
  })
  const checkNumber = (num, sort) => {
    if (num !== '' || num !== null) obj.canClick = true
    if (sort) {
      const r = obj.result
      obj.result = r + num
      emit('sendResult', obj.result)
    } else {
      const r = obj.secondResult
      obj.secondResult = r + num
      emit('sendSecondResult', obj.secondResult)
    }
  }
  const handleOperate = (type, limit) => {
    if (!limit) return
    if (type === 'delete') {
      if (obj.secondResult !== '') {
        obj.secondResult = obj.secondResult.substring(0, obj.secondResult.length -1)
        emit('sendSecondResult', obj.secondResult)
        return
      } else if (obj.secondResult === '' && obj.operateType !== '') {
        obj.operateType = ''
        emit('sendOperate', obj.operateType)
        return
      } else {
        obj.result = obj.result.substring(0, obj.result.length -1)
        emit('sendResult', obj.result)
        if (obj.result === '') {
          obj.isFinishBtnShow = true
        }
        return
      }
    }
    if (type === 'add') {
      if (obj.operateType === '+' && obj.secondResult !== '') {
        obj.result = add(obj.result, obj.secondResult, obj.sumResult)
        obj.secondResult = ''
        obj.operateType = '+'
        emit('sendSecondResult', obj.secondResult)
        emit('sendResult', obj.result)
        return
      }
      obj.isFinishBtnShow = false
      obj.result = add(obj.result, obj.secondResult, obj.sumResult)
      obj.operateType = '+'
      obj.isFirst = false
      emit('sendOperate', obj.operateType)
      return
    }
    if (type === 'minus') {
      if (obj.operateType === '-' && obj.secondResult !== '') {
        obj.result = subtraction(obj.result, obj.secondResult, obj.sumResult)
        obj.secondResult = ''
        obj.operateType = '-'
        emit('sendSecondResult', obj.secondResult)
        emit('sendResult', obj.result)
        return
      }
      obj.isFinishBtnShow = false
      obj.result = subtraction(obj.result, obj.secondResult, obj.sumResult)
      obj.operateType = '-'
      obj.isFirst = false
      emit('sendOperate', obj.operateType)
      return
    }
    if (type === 'finish') {
      obj.isFinishBtnShow = false
      if (obj.result !== '' && obj.secondResult === '') {
        obj.result = obj.result.toString().replace(/\+/g, "")
        obj.result = obj.result.toString().replace(/\-/g, "")
        emit('sendResult', obj.result)
        return
      } else if (obj.result !== '' && obj.secondResult !== '' && obj.operateType === '+') {
        obj.sumResult = add(obj.result, obj.secondResult, obj.sumResult)
        console.log(obj.sumResult, 'obj.sumResult')
        emit('sendResult', obj.result)
      }
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
        margin-bottom: 0rpx;
      }
      &:first-child {
        margin-top: 10rpx;
      }
    }
  }
</style>