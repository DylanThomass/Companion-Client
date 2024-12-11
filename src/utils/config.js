/**
 * 项目配置文件
 * 统一管理项目中使用到的配置信息
 * 方便管理和维护
 */

// 基础配置
export const baseConfig = {
  // 应用信息
  appTitle: import.meta.env.VITE_APP_TITLE,
  appVersion: import.meta.env.VITE_APP_VERSION,

  // 微信小程序配置
  appId: import.meta.env.VITE_APP_APPID,

  // API配置
  apiBaseUrl: import.meta.env.VITE_APP_API_BASE_URL,

  // 调试模式
  debug: import.meta.env.VITE_APP_DEBUG === "true",
};

// 请求配置
export const requestConfig = {
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
};

// // 缓存键名配置
// export const storageKeys = {
//   token: "AUTH_TOKEN",
//   userInfo: "USER_INFO",
// };
