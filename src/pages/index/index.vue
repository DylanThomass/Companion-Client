<template>
  <view class="min-h-screen bg-gray-100">
    <view class="p-20 space-y-6">
      <!-- 使用 UnoCSS 类 -->
      <text class="text-3xl font-bold text-blue-600">UnoCSS 测试</text>

      <!-- 卡片容器 -->
      <view class="bg-white rounded-lg shadow-lg p-6">
        <text class="text-xl text-gray-800 mb-4">{{ title }}</text>
        <view class="flex space-x-4">
          <view
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            按钮 1
          </view>
          <view
            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            按钮 2
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { useUserStore } from "@/store/modules/user";
import request from "@/utils/request";

const userStore = useUserStore();

// 获取微信code
const getWxCode = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: "weixin",
      success: (res) => {
        console.log("获取code成功：", res.code);
        resolve(res.code);
      },
      fail: reject,
    });
  });
};

// 静默登录
const silentLogin = async () => {
  try {
    // 1. 获取微信code
    const code = await getWxCode();

    // 2. 发送code到后端换取登录凭证
    const res = await request({
      url: "/api/wx/silent-login",
      method: "POST",
      data: { code },
    });

    // 3. 保存登录信息
    if (res.code === 200) {
      userStore.setToken(res.data.token);
      userStore.setUserInfo({
        openid: res.data.openid,
        nickname: res.data.nickname,
        avatar: res.data.avatar,
        exp: res.data.exp,
        userType: 2,
        sessionKey: res.data.sessionKey,
        phone: null,
      });
    }
  } catch (error) {
    console.error("静默登录失败：", error);
  }
};

// 页面加载时执行静默登录
onLoad(() => {
  silentLogin();
});
</script>

<style></style>
