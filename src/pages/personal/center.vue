<template>
  <view class="personal-center pt-4 bg-gray-100 min-h-screen">
    <!-- 未登录状态的用户信息区域 -->
    <view class="guest-info mx-4 bg-white rounded-lg shadow-sm">
      <view class="flex items-center p-6">
        <view class="shrink-0">
          <u-avatar
            size="88"
            icon="account"
            customStyle="background: linear-gradient(135deg, #E0C3FC, #8EC5FC)"
            class="shadow-sm"
          ></u-avatar>
        </view>
        <view class="flex-1 ml-5 flex flex-col items-start">
          <view class="w-full">
            <text class="text-gray-800 text-lg font-medium block text-center"
              >Hi, 欢迎使用</text
            >
            <text class="text-gray-400 text-sm block text-center mb-3"
              >登录后体验更多功能</text
            >
            <u-button
              type="primary"
              size="small"
              @click="handleLogin"
              class="rounded-full mx-auto"
              text="登录/注册"
              customStyle="width: 240rpx; height: 64rpx; background: #8EC5FC; font-size: 28rpx; border-radius: 32rpx"
            ></u-button>
          </view>
        </view>
      </view>
    </view>

    <!-- 通用功能区域 -->
    <view class="mx-4 mt-4">
      <view class="mb-3">
        <text class="text-gray-500 text-xs font-medium">常用功能</text>
      </view>
      <view class="grid grid-cols-2 gap-3 mb-4">
        <view
          class="bg-white rounded-lg shadow-sm p-4 flex items-center"
          @click="handleNavigate('/pages/common/faq')"
        >
          <u-icon name="question-circle" size="22" color="#8EC5FC"></u-icon>
          <text class="ml-3 text-gray-600 text-sm">常见问题</text>
        </view>

        <view
          class="bg-white rounded-lg shadow-sm p-4 flex items-center"
          @click="handleClearCache"
        >
          <u-icon name="trash" size="24" color="#8EC5FC"></u-icon>
          <view class="ml-3">
            <text class="text-gray-700">清理缓存</text>
            <text class="block text-xs text-gray-400">{{ cacheSize }}</text>
          </view>
        </view>
      </view>

      <view class="mb-3">
        <text class="text-gray-500 text-xs font-medium">关于我们</text>
      </view>
      <view class="grid grid-cols-2 gap-3">
        <view
          class="bg-white rounded-lg shadow-sm p-4 flex items-center"
          @click="handleNavigate('/pages/common/terms')"
        >
          <u-icon name="file" size="24" color="#8EC5FC"></u-icon>
          <text class="ml-3 text-gray-600 text-sm truncate">隐私政策</text>
        </view>

        <view
          class="bg-white rounded-lg shadow-sm p-4 flex items-center"
          @click="handleNavigate('/pages/common/feedback')"
        >
          <u-icon name="chat" size="24" color="#8EC5FC"></u-icon>
          <text class="ml-3 text-gray-600 text-sm truncate">投诉反馈</text>
        </view>

        <view
          class="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between col-span-2"
          @click="handleNavigate('/pages/common/social')"
        >
          <view class="flex items-center">
            <u-icon name="share" size="24" color="#8EC5FC"></u-icon>
            <text class="ml-3 text-gray-600 text-sm truncate">社交媒体</text>
          </view>

          <view class="flex items-center space-x-6 mr-4">
            <image src="/static/icons/weixin.png" class="w-40 h-40"></image>
            <image src="/static/icons/douyin.png" class="w-40 h-40"></image>
            <image src="/static/icons/xhs.png" class="w-40 h-40"></image>
            <image src="/static/icons/bilibili.png" class="w-40 h-40"></image>
          </view>
        </view>
      </view>
    </view>

    <!-- 版本信息 -->
    <view class="mt-12 mb-8 text-center">
      <view class="flex flex-col items-center space-y-2">
        <text class="text-gray-400 text-xs">当前版本 v1.0.0</text>
        <text class="text-gray-300 text-xs"
          >Copyright © 2024 All Rights Reserved</text
        >
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 缓存大小
const cacheSize = ref("0MB");

// 登录方法
const handleLogin = () => {
  uni.navigateTo({
    url: "/pages/login/index",
  });
};

// 页面跳转方法
const handleNavigate = (url) => {
  uni.navigateTo({ url });
};

// 清理缓存方法
const handleClearCache = () => {
  uni.showModal({
    title: "提示",
    content: "确认清理缓存？",
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({
          title: "清理中...",
        });
        // 模拟清理缓存
        setTimeout(() => {
          cacheSize.value = "0MB";
          uni.hideLoading();
          uni.showToast({
            title: "清理成功",
            icon: "success",
          });
        }, 1500);
      }
    },
  });
};

// 获取缓存大小
const getCacheSize = () => {
  // 这里可以调用相关API获实际缓存大小
  cacheSize.value = "23.5MB";
};

// 页面加载时取缓存大小
onMounted(() => {
  getCacheSize();
});
</script>

<style>
/* 仅保留必要的自定义样式，其他使用 unocss */
:deep(.u-cell__title) {
  color: #333 !important;
}

:deep(.u-cell__value) {
  color: #666 !important;
}

:deep(.u-cell-group__title) {
  padding-left: 32rpx !important;
  color: #666 !important;
  font-size: 24rpx !important;
}
</style>
