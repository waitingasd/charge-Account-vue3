<template>
<view class="page-mine">
  <view v-if="!isShowUserInfo" class="mine-login">
    <view v-if="!isShowUserInfo" class="mine-top"></view>
    <view v-if="!isShowUserInfo" class="my-login">
      <uni-forms
        v-if="!noRegist"
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
      <uni-forms
        v-if="noRegist"
        ref="formRegist"
        :modelValue="registFormData"
        :rules="registRules"
      >
        <uni-forms-item name="phoneNumber">
          <uni-easyinput
            class="input-form"
            type="text"
            v-model="registFormData.phoneNumber"
            maxlength="11"
            placeholder="请输入手机号"
            style="margin-top: 50rpx"
            :style="styles"
          />
        </uni-forms-item>
        <uni-forms-item name="password">
          <uni-easyinput
            class="input-form"
            v-model="registFormData.password"
            type="password"
            placeholder="请输入密码"
            :style="styles"
          />
        </uni-forms-item>
        <uni-forms-item name="againPassword">
          <uni-easyinput
            class="input-form"
            v-model="registFormData.againPassword"
            type="password"
            placeholder="请再次输入密码"
            :style="styles"
          />
        </uni-forms-item>
      </uni-forms>
      <button v-if="!noRegist" class="btn" @tap="login">登录</button>
      <button v-if="noRegist" class="btn" @tap="register">注册</button>
      <view class="tip-loginRegist" v-if="!noRegist" @tap="toRegister"
        >没有账号？去注册</view
      >
      <view class="tip-loginRegist" v-if="noRegist" @tap="toLogin"
        >已有账号？去登录</view
      >
    </view>
  </view>
  <view v-if="isShowUserInfo" class="my-info">
    <personal-center :userInfo="userInfo" @showForm="showForm" />
  </view>
</view>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { userLogin, getUserInfo, registUser } from "../../api/index.js";
import { computed, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import personalCenter from "./personal-center.vue";
export default {
  components: { personalCenter },
  setup() {
    const store = useStore();
    const swe = reactive({
      userInfo: {},
      res: {},
    });
    const isShowUserInfo = ref(false);
    const noRegist = ref(false); // 是否没注册
    // if (store.getters.charge_token !== "") {
      getUserInfo().then((res) => {
        swe.res = computed(() => {
          return res?.data?.data;
        });
        if (swe.res) {
          if (store.getters.charge_token !== '') {
          isShowUserInfo.value = true;
          swe.userInfo = swe.res;
          }
        }
      });
    // }
    const formData = ref({
      name: "",
      password: "",
    });
    const registFormData = ref({
      phoneNumber: "",
      password: "",
      againPassword: "",
    });
    const rules = ref({
      name: {
        rules: [
          {
            required: true,
            errorMessage: "请输入用户名",
          },
        ],
      },
      password: {
        rules: [
          {
            required: true,
            errorMessage: "请输入正确的密码",
          },
        ],
      },
    });
    const registRules = ref({
      phoneNumber: {
        rules: [
          {
            required: true,
            errorMessage: "请输入手机号",
          },
        ],
      },
      password: {
        rules: [
          {
            required: true,
            errorMessage: "请输入密码",
          },
        ],
      },
      againPassword: {
        rules: [
          {
            required: true,
            errorMessage: "请再次输入密码",
          },
        ],
      },
    });
    const styles = reactive({
      backgroundColor: "#deecf5",
    });
    // 登录
    const login = async () => {
      const { data: res } = await userLogin(formData._value);
      store.commit("SET_TOKEN", res?.token);
      getUserInfo().then((res) => {
        isShowUserInfo.value = true;
        swe.userInfo = res?.data?.data;
      });
    };
    // 注册
    const register = async () => {
      const { data: res } = await registUser(registFormData._value);
      if (res?.code === 0) {
        noRegist.value = false;
      }
    };
    const toRegister = () => {
      noRegist.value = true;
    };
    const toLogin = () => {
      noRegist.value = false;
    };
    const showForm = (val) => {
      isShowUserInfo.value = val;
    };
    return {
      store,
      isShowUserInfo,
      formData,
      rules,
      login,
      ...toRefs(swe),
      showForm,
      noRegist,
      register,
      registRules,
      registFormData,
      toRegister,
      toLogin,
      styles,
    };
  },
};
</script>

<style lang="scss">
page {
  height: 100%;
}
.page-mine {
  height: 100%;
.mine-login {
  height: 100%;
  background-image: linear-gradient(90deg, #dde0e7, #f2b0b0);
  .mine-top {
    height: 30%;
  }
  .my-login {
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    background-color: #edf4fe;
    height: 70%;
    .tip-loginRegist {
      text-align: center;
      color: #a6927c;
      margin-top: 40rpx;
      font-size: 24rpx;
      font-weight: 550;
    }
    .input-form {
      width: 90%;
      margin: 0 auto;
      border-radius: 16rpx !important;
      ::v-deep .uni-easyinput__content-input {
        height: 90rpx;
      }
    }
    .btn {
      width: 90%;
      color: white;
      border-radius: 48rpx;
      background-image: linear-gradient(90deg, #f1e1e4 -8%, #debe76 92%);
      &::after {
        border-color: transparent !important;
      }
    }
  }
}
.my-info {
  height: 100%;
}
    
}
       

</style>
