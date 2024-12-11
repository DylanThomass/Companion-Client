import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: uni.getStorageSync("token") || "",
    userInfo: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    setToken(token) {
      try {
        console.log("Setting token:", token); // 调试日志
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

    clearToken() {
      try {
        this.token = "";
        uni.removeStorageSync("token");
        console.log("Token cleared"); // 调试日志
      } catch (error) {
        console.error("Error clearing token:", error);
      }
    },

    setUserInfo(info) {
      this.userInfo = info;
      uni.setStorageSync("userInfo", info);
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
