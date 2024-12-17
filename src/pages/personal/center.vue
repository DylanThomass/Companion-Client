<template>
  <view class="personal-center bg-gray-50 min-h-screen">
    <view class="mx-4 bg-white rounded-lg shadow-sm">
      <view class="py-8 px-8">
        <template v-if="isLoggedIn">
          <view class="flex flex-col items-center text-center">
            <!-- 基础信息区域 -->
            <view class="flex items-center justify-between w-full mb-6">
              <!-- 头像 -->
              <u-avatar size="88" :src="userInfo.avatar" class="shadow-md" />

              <!-- 数据展示区域 -->
              <view class="flex space-x-8">
                <!-- 所有用户都显示钱包和优惠券 -->
                <view class="flex flex-col items-center">
                  <view class="flex items-baseline">
                    <text class="text-gray-400 text-xs mr-1">¥</text>
                    <text class="text-gray-800 text-lg font-medium">{{
                      userInfo.balance || "0.00"
                    }}</text>
                  </view>
                  <view class="flex items-center mt-1">
                    <u-icon
                      name="rmb-circle"
                      size="12"
                      color="#94A3B8"
                      class="mr-1"
                    />
                    <text class="text-gray-400 text-xs">钱包</text>
                  </view>
                </view>
                <view class="flex flex-col items-center">
                  <view class="flex items-baseline">
                    <text class="text-gray-800 text-lg font-medium">{{
                      userInfo.coupons || "0"
                    }}</text>
                    <text class="text-gray-400 text-xs ml-1">张</text>
                  </view>
                  <view class="flex items-center mt-1">
                    <u-icon
                      name="coupon"
                      size="12"
                      color="#94A3B8"
                      class="mr-1"
                    />
                    <text class="text-gray-400 text-xs">优惠券</text>
                  </view>
                </view>
              </view>
            </view>

            <!-- 用户信息 -->
            <view class="flex flex-col items-center">
              <view class="flex items-center mb-3">
                <text
                  class="text-gray-800 text-xl font-medium truncate max-w-[200px]"
                >
                  {{ userInfo.nickname }}
                </text>
                <u-tag
                  :text="getUserLevelText(userInfo.exp)"
                  :type="getUserLevelType(userInfo.exp)"
                  size="mini"
                  class="ml-2 shrink-0"
                />
              </view>

              <!-- 经验值进度条和店员服务数据并排 -->
              <view class="w-full px-4 mb-4 flex items-center space-x-8">
                <!-- 经验值进度条 -->
                <view class="flex-1">
                  <view class="flex items-center justify-between mb-2">
                    <text class="text-xs text-gray-400">
                      Lv.{{ getCurrentLevel(userInfo.exp) }}
                    </text>
                    <text class="text-xs text-gray-400">
                      {{ userInfo.exp || 0 }}/{{
                        getNextLevelExp(userInfo.exp)
                      }}
                    </text>
                  </view>
                  <view
                    class="w-full h-1 bg-gray-100 rounded-full overflow-hidden"
                  >
                    <view
                      class="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300"
                      :style="{ width: `${getExpProgress(userInfo.exp)}%` }"
                    />
                  </view>
                </view>

                <!-- 店员服务数据 -->
                <template v-if="userInfo.userType === 2">
                  <view class="flex space-x-8 shrink-0">
                    <view class="flex flex-col items-center">
                      <view class="flex items-baseline">
                        <text class="text-gray-800 text-lg font-medium">{{
                          userInfo.serviceScore || "5.0"
                        }}</text>
                      </view>
                      <view class="flex items-center mt-1">
                        <u-icon
                          name="star-fill"
                          size="12"
                          color="#94A3B8"
                          class="mr-1"
                        />
                        <text class="text-gray-400 text-xs">服务评分</text>
                      </view>
                    </view>
                    <view class="flex flex-col items-center">
                      <view class="flex items-baseline">
                        <text class="text-gray-800 text-lg font-medium">{{
                          userInfo.orderCount || "0"
                        }}</text>
                      </view>
                      <view class="flex items-center mt-1">
                        <u-icon
                          name="order"
                          size="12"
                          color="#94A3B8"
                          class="mr-1"
                        />
                        <text class="text-gray-400 text-xs">接单数</text>
                      </view>
                    </view>
                  </view>
                </template>
              </view>

              <!-- 个性签名 -->
              <text class="text-gray-400 text-xs mb-8">
                {{
                  userInfo.userType === 2
                    ? userInfo.introduction
                    : userInfo.signature
                }}
              </text>

              <!-- 操作按钮 -->
              <view class="flex space-x-4">
                <view @click="handleEditProfile">
                  <u-button
                    type="primary"
                    size="mini"
                    text="编辑资料"
                    plain
                    class="rounded-full text-xs px-6 h-8"
                  />
                </view>
                <view @click="handleNavigate('/pages/personal/settings')">
                  <u-button
                    type="info"
                    size="mini"
                    text="设置"
                    plain
                    class="rounded-full text-xs px-6 h-8"
                  />
                </view>
              </view>
            </view>
          </view>
        </template>

        <!-- 未登录状态显示欢迎语 -->
        <template v-else>
          <view class="flex flex-col items-center text-center">
            <u-avatar
              size="88"
              icon="account"
              customStyle="background: linear-gradient(135deg, #E0C3FC, #8EC5FC)"
              class="shadow-md mb-6"
            />
            <view class="flex flex-col items-center">
              <text class="text-gray-800 text-xl font-medium mb-2"
                >Hi，欢迎来到心灵伴侣</text
              >
              <text class="text-gray-400 text-sm mb-8">一键授权手机号登录</text>
              <button
                class="auth-btn text-white"
                open-type="getPhoneNumber"
                @getphonenumber="handleGetPhoneNumber"
              >
                一键授权
              </button>
            </view>
          </view>
        </template>
      </view>
    </view>

    <!-- 登录后的功能区域 -->
    <!-- <view v-if="isLoggedIn" class="mx-4 mt-4">
      <view class="mb-3">
        <text class="text-gray-500 text-xs font-medium">我的服务</text>
      </view>
      <view class="bg-white rounded-lg shadow-sm">
        <view class="grid grid-cols-4 gap-6 py-6 px-8">
          <view
            v-for="(item, index) in userServices"
            :key="index"
            class="flex flex-col items-center"
            @click="handleNavigate(item.url)"
          >
            <view class="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">
              <u-icon :name="item.icon" size="18" color="#8EC5FC" />
            </view>
            <text class="mt-3 text-gray-600 text-xs">{{ item.title }}</text>
          </view>
        </view>
      </view>
    </view> -->

    <!-- 通用功能区域 -->
    <!-- <view class="mx-4 mt-4">
      <view class="mb-3">
        <text class="text-gray-500 text-xs font-medium">常用功能</text>
      </view>
      <view class="grid grid-cols-2 gap-3 mb-4">
        <view
          class="bg-white rounded-lg shadow-sm p-4 flex items-center"
          @click="handleNavigate('/pages/common/faq')"
        >
          <u-icon name="question-circle" size="22" color="#8EC5FC" />
          <text class="ml-3 text-gray-600 text-xs">常见问题</text>
        </view>

        <view
          class="bg-white rounded-lg shadow-sm p-4 flex items-center"
          @click="handleClearCache"
        >
          <u-icon name="trash" size="22" color="#8EC5FC" />
          <view class="ml-3">
            <text class="text-gray-700 text-xs">清理缓存</text>
            <text class="block text-xs text-gray-400">{{ cacheSize }}</text>
          </view>
        </view>
      </view>
    </view> -->

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
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/store/modules/user";
import request from "@/utils/request";

const userStore = useUserStore();

const isLoggedIn = computed(() => userStore.isLoggedIn);
const userInfo = computed(() => ({
  ...defaultUserInfo,
  ...userStore.userInfo,
}));

const cacheSize = ref("0MB");

const userServices = [
  { title: "我的订单", icon: "order", url: "/pages/order/list" },
  { title: "心动店员", icon: "star", url: "/pages/staff/favorites" },
  { title: "消息���知", icon: "bell", url: "/pages/message/list" },
  { title: "成为店员", icon: "plus-circle", url: "/pages/staff/apply" },
  { title: "帮助中心", icon: "question-circle", url: "/pages/common/help" },
  { title: "账号安全", icon: "lock", url: "/pages/personal/security" },
  { title: "联系客服", icon: "server-man", url: "/pages/common/service" },
  { title: "留言板", icon: "edit-pen", url: "/pages/message/board" },
];

const generateNickname = () => {
  return `用户${Math.random().toString(36).substr(2, 6)}`;
};

const handleGetPhoneNumber = async (e) => {
  if (e.detail.code) {
    try {
      uni.showLoading({ title: "授权中..." });

      const res = await request({
        url: "/api/wx/phone",
        method: "POST",
        data: {
          code: e.detail.code,
        },
      });

      if (res.code === 200) {
        userStore.setUserInfo({
          ...userStore.userInfo,
          userType: 1,
          phone: res.data.phone,
        });

        uni.showToast({
          title: "授权成功",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("手机号授权失败：", error);
      uni.showToast({
        title: "授权失败，请重试",
        icon: "none",
      });
    } finally {
      uni.hideLoading();
    }
  } else {
    uni.showToast({
      title: "您取消了授权",
      icon: "none",
    });
  }
};

const handleEditProfile = () => {
  uni.navigateTo({
    url: "/pages/personal/profile",
  });
};

const handleNavigate = (url) => {
  uni.navigateTo({ url });
};

const handleClearCache = () => {
  uni.showModal({
    title: "提示",
    content: "确认清理缓存？",
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({
          title: "清理中...",
        });
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

const getCacheSize = () => {
  cacheSize.value = "23.5MB";
};

onMounted(() => {
  getCacheSize();
});

// 店员等级配置
const STAFF_LEVELS = [
  { name: "心萌新人", exp: 0, type: "info" },
  { name: "情感学徒", exp: 101, type: "success" },
  { name: "情感导师", exp: 501, type: "warning" },
  { name: "心灵导师", exp: 2001, type: "error" },
  { name: "情感大师", exp: 5000, type: "primary" },
];

// 普通用户等级配置保持不变
const USER_LEVELS = [
  { name: "心灵萌新", exp: 0, type: "info" },
  { name: "心灵知友", exp: 501, type: "success" },
  { name: "心灵引导者", exp: 2001, type: "warning" },
  { name: "心灵守护者", exp: 5001, type: "error" },
  { name: "心灵大师", exp: 10000, type: "primary" },
];

const getUserLevelText = (exp) => {
  const levels = userInfo.value.userType === 2 ? STAFF_LEVELS : USER_LEVELS;
  const level = levels.findLast((level) => exp >= level.exp);
  return level ? level.name : levels[0].name;
};

const getUserLevelType = (exp) => {
  const levels = userInfo.value.userType === 2 ? STAFF_LEVELS : USER_LEVELS;
  const level = levels.findLast((level) => exp >= level.exp);
  return level ? level.type : levels[0].type;
};

const getCurrentLevel = (exp) => {
  const levels = userInfo.value.userType === 2 ? STAFF_LEVELS : USER_LEVELS;
  return levels.findLastIndex((level) => exp >= level.exp) + 1;
};

const getNextLevelExp = (exp) => {
  const levels = userInfo.value.userType === 2 ? STAFF_LEVELS : USER_LEVELS;
  const nextLevel = levels.find((level) => level.exp > exp);
  return nextLevel ? nextLevel.exp : levels[levels.length - 1].exp;
};

const getExpProgress = (exp) => {
  const levels = userInfo.value.userType === 2 ? STAFF_LEVELS : USER_LEVELS;
  const currentLevelIndex = levels.findLastIndex((level) => exp >= level.exp);
  const currentLevel = levels[currentLevelIndex];
  const nextLevel = levels[currentLevelIndex + 1];

  if (!nextLevel) {
    return 100;
  }

  const currentLevelExp = currentLevel.exp;
  const nextLevelExp = nextLevel.exp;
  const expInCurrentLevel = exp - currentLevelExp;
  const expNeededForNextLevel = nextLevelExp - currentLevelExp;

  return Math.min(
    100,
    Math.floor((expInCurrentLevel / expNeededForNextLevel) * 100)
  );
};

const defaultUserInfo = {
  nickname: "普通用户A",
  avatar: "",
  signature: "这个人很懒,什么都没写~",
  introduction: "专业心理咨询师，擅长情感咨询",
  exp: 0,
  balance: "0.00",
  coupons: "0",
  userType: 1,
  serviceScore: "5.0",
  orderCount: "0",
};
</script>

<style>
/* 字体相关 */
.font-din {
  font-family: "DIN Alternate", -apple-system, BlinkMacSystemFont,
    "Helvetica Neue", Arial, sans-serif;
}

.font-system {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    Arial, sans-serif;
}

/* uView 组件样式覆盖 */
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

/* 标签样式 */
:deep(.u-tag) {
  border: none !important;
  padding: 4rpx 12rpx !important;
  border-radius: 12rpx !important;
}

:deep(.u-tag--primary) {
  background: linear-gradient(135deg, #7f7fd5 0%, #91eae4 100%) !important;
  box-shadow: 0 4rpx 12rpx rgba(127, 127, 213, 0.3) !important;
}

:deep(.u-tag--success) {
  background: linear-gradient(135deg, #00b09b 0%, #96c93d 100%) !important;
  box-shadow: 0 4rpx 12rpx rgba(0, 176, 155, 0.3) !important;
}

:deep(.u-tag--warning) {
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%) !important;
  box-shadow: 0 4rpx 12rpx rgba(246, 211, 101, 0.3) !important;
}

:deep(.u-tag--error) {
  background: linear-gradient(135deg, #ff9a9e 0%, #f6416c 100%) !important;
  box-shadow: 0 4rpx 12rpx rgba(255, 154, 158, 0.3) !important;
}

:deep(.u-tag--info) {
  background: linear-gradient(135deg, #91eae4 0%, #86a8e7 100%) !important;
  box-shadow: 0 4rpx 12rpx rgba(145, 234, 228, 0.3) !important;
}

:deep(.u-tag__text) {
  color: #ffffff !important;
  font-size: 20rpx !important;
  font-weight: 500 !important;
  letter-spacing: 0.5rpx !important;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1) !important;
}

:deep(.u-tag:active) {
  transform: translateY(1rpx);
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.15) !important;
}

/* 授权按钮样式 */
.auth-btn {
  width: 360rpx;
  height: 88rpx;
  line-height: 88rpx;
  background: linear-gradient(135deg, #8ec5fc 0%, #e0c3fc 100%);
  border-radius: 44rpx;
  border: none;
  font-size: 28rpx;
  font-weight: 500;
  letter-spacing: 2rpx;
  box-shadow: 0 8rpx 16rpx rgba(142, 197, 252, 0.3);
  transition: all 0.3s ease;
}

.auth-btn:active {
  transform: scale(0.98);
  box-shadow: 0 4rpx 8rpx rgba(142, 197, 252, 0.2);
}

.auth-btn::after {
  border: none;
}

/* 网格布局相关 */
.grid > view {
  transition: transform 0.2s ease;
}

.grid > view:active {
  transform: scale(0.95);
}

/* 页面容器样式 */
.personal-center {
  min-height: 100vh;
  background-color: #f8fafc;
}
</style>
