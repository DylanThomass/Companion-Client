# 更新日志

## [未发布] - 2024-12-11

### 新增

- 集成 UnoCSS，实现原子化 CSS
- 集成 uView Plus UI 组件库
- 在测试页面中添加 uView Plus 按钮组件测试

### 修复

- 修复 vite.config.js 中的 ESM 导入问题

### 变更

- 从 Tailwind CSS 迁移到 UnoCSS

## [未发布] - 2024-12-11

### 新增

- 初始化项目结构
- 添加 Pinia 状态管理
- 实现用户认证存储功能
- 封装 Axios 请求工具

### 网络请求

- 封装 Axios 适配器以支持 uni-app 环境
- 实现请求拦截器，自动添加 token
- 实现响应拦截器，统一处理响应格式
- 添加全局错误处理机制

### 用户认证

- 实现微信静默登录功能
- 封装 token 管理
- 实现用户信息持久化存储

### 技术栈

- Vue 3 + Vite
- uni-app
- Pinia
- Axios
- UnoCSS
- uview-plus

### 项目结构

src/
├── components/ # 公共组件
├── pages/ # 页面文件
├── store/ # Pinia 状态管理
│ └── modules/
│ └── user.js
├── utils/ # 工具函数
│ ├── request.js # 网络请求封装
│ └── config.js # 配置文件
└── App.vue # 入口文件
