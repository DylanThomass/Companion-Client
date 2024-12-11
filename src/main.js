import uviewPlus from "uview-plus";
import "uno.css";

import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// // 确保 mock 在应用启动前加载
// if (process.env.NODE_ENV === "development") {
//   const mock = require("./mock/index.js");
//   console.log("Mock 已加载");
// }

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.use(uviewPlus);
  return {
    app,
  };
}
