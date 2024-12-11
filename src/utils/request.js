import axios from "axios";
import { baseConfig } from "./config";
import { useUserStore } from "@/store/modules/user";
import adapter from "./axios-adapter";

// 创建axios实例
const service = axios.create({
  baseURL: baseConfig.apiBaseUrl,
  timeout: 6000,
  adapter, // 使用自定义适配器
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers["Authorization"] = `Bearer ${userStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log("响应数据:", res); // 添加调试日志

    // 不再提前返回 res.data，保留完整响应结构
    return res;
  },
  (error) => {
    // 处理 HTTP 状态码错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，清除 token 并跳转到登录页面
          const userStore = useUserStore();
          userStore.clearToken();
          break;
        case 403:
          console.error("没有权限访问该资源");
          break;
        case 404:
          console.error("请求的资源不存在");
          break;
        case 500:
          console.error("服务器错误");
          break;
        default:
          console.error(`HTTP错误：${error.response.status}`);
      }
    }
    return Promise.reject(error);
  }
);

// 导出实例
export default service;
