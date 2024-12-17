import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: uni.getStorageSync("token") || "",
    userInfo: uni.getStorageSync("userInfo") || null,
  }),

  getters: {
    isLoggedIn: (state) => {
      return !!(state.token && state.userInfo?.phone);
    },
  },

  actions: {
    setToken(token) {
      try {
        this.token = token;
        uni.setStorageSync("token", token);
        // 验证是否成功存储
        const savedToken = uni.getStorageSync("token");
        console.log("Saved token:", savedToken); // 调试日志
        if (savedToken !== token) {
          console.error("Token storage verification failed");
        }
      } catch (error) {
        console.error("Error setting token:", error);
      }
    },

    setUserInfo(info) {
      this.userInfo = info;
      uni.setStorageSync("userInfo", info);
    },

    clearToken() {
      try {
        this.token = "";
        uni.removeStorageSync("token");
      } catch (error) {
        console.error("Error clearing token:", error);
      }
    },

    clearUserInfo() {
      this.userInfo = null;
      uni.removeStorageSync("userInfo");
    },

    logout() {
      this.clearToken();
      this.clearUserInfo();
    },
  },
});
