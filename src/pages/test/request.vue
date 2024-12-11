<template>
  <view class="p-4 bg-gray-100 min-h-screen">
    <!-- 测试按钮组 -->
    <view class="mb-6 grid grid-cols-2 gap-4">
      <button
        @click="testLogin"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md active:scale-95 transform transition-all"
      >
        测试登录
      </button>

      <button
        @click="testUserInfo"
        class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md active:scale-95 transform transition-all"
      >
        获取用户信息
      </button>

      <button
        @click="test401"
        class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md active:scale-95 transform transition-all"
      >
        测试401错误
      </button>

      <button
        @click="testError"
        class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md active:scale-95 transform transition-all"
      >
        测试其他错误
      </button>

      <u-button @click="testUViewButton" type="primary" class="mt-4">
        测试 uView Plus 按钮
      </u-button>
    </view>

    <!-- 结果展示 -->
    <view v-if="result" class="bg-white rounded-lg shadow-md p-4">
      <view class="text-lg font-semibold text-gray-700 mb-2"> 测试结果 </view>
      <view class="bg-gray-50 rounded-lg p-4 overflow-auto">
        <text
          class="font-mono text-sm text-gray-600 whitespace-pre-wrap break-all"
        >
          {{ JSON.stringify(result, null, 2) }}
        </text>
      </view>
    </view>

    <!-- 登录状态 -->
    <view class="mt-6 bg-white rounded-lg shadow-md p-4">
      <view class="text-lg font-semibold text-gray-700 mb-2"> 当前状态 </view>
      <view class="space-y-2">
        <view class="flex items-center">
          <text class="text-gray-500">Token:</text>
          <text class="ml-2 text-sm text-gray-600 truncate flex-1">
            {{ userStore.token || "未登录" }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import request from "@/utils/request";
import { useUserStore } from "@/store/modules/user";

const result = ref(null);
const userStore = useUserStore();

const testLogin = async () => {
  try {
    console.log("开始登录请求");
    const res = await request({
      url: "/api/login",
      method: "post",
      data: {
        username: "test",
        password: "123456",
      },
    });
    console.log("登录响应:", res);
    result.value = res;
    userStore.setToken(res.token);
  } catch (error) {
    console.error("登录错误:", error);
    result.value = error.message;
  }
};

const testUserInfo = async () => {
  try {
    const res = await request({
      url: "/api/user/info",
      method: "get",
    });
    result.value = res;
  } catch (error) {
    result.value = error.message;
  }
};

const test401 = async () => {
  try {
    const res = await request({
      url: "/api/test-401",
      method: "get",
    });
    result.value = res;
  } catch (error) {
    result.value = error.message;
  }
};

const testError = async () => {
  try {
    const res = await request({
      url: "/api/test-error",
      method: "get",
    });
    result.value = res;
  } catch (error) {
    result.value = error.message;
  }
};

const testUViewButton = () => {
  console.log("uView Plus 按钮被点击");
  result.value = "uView Plus 按钮测试成功";
};
</script>
