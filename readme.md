# Companion Client (心灵伴侣)

## 项目简介

### 项目描述

Companion Client(心灵伴侣)是一款基于微信小程序平台开发的情感社交应用。它致力于为用户提供一个温暖的情感交流平台,通过 AI 技术赋能,帮助用户获得情感支持与心理疏导。

### 主要功能

- AI 情感咨询: 智能 AI 助手提供 24 小时情感解答服务
- 真人咨询: 连接专业情感咨询师,提供一对一咨询服务
- 树洞社区: 提供匿名情感分享空间,倾听与被倾听
- 虚拟恋爱: 打造虚拟情感体验,提供温暖陪伴

### 技术栈

- 框架: uni-app
- 前端: Vue3 + JavaScript
- 构建工具: Vite
- UI 组件库: uni-ui
- 状态管理: Pinia

## 快速开始

### 环境要求

- Node.js 18.0+ (推荐 20.4+)
- 微信开发者工具
- VSCode (推荐)

### 安装步骤

1. 克隆项目

```bash
git clone https://github.com/your-username/companion-client.git
cd companion-client
```

2. 安装依赖

```bash
pnpm install
```

3. 启动开发环境

```bash
# 启动开发服务
pnpm run dev

# 运行微信小程序
pnpm run dev:mp-weixin

# 打包微信小程序
pnpm run build:mp-weixin
```

### 开发工具配置

1. VSCode 推荐插件

- Volar - Vue 3 语法支持
- ESLint - 代码规范检查
- Prettier - 代码格式化
- WeChat Mini Program - 小程序开发支持

2. 微信开发者工具配置

- 导入项目目录: `/dist/dev/mp-weixin`
- 关闭 ES6 转 ES5
- 关闭上传代码时样式自动补全
- 关闭上传代码时自动压缩

3. 特殊说明

- 项目使用了 TailwindCSS，需要注意微信小程序的样式限制
- 运行 `pnpm run postinstall` 以修复 TailwindCSS 在小程序中的兼容性问题

## 项目结构

```
companion-client
├── src                     # 源代码目录
│   ├── api                 # API 接口定义
│   ├── assets             # 静态资源文件
│   │   ├── images         # 图片资源
│   │   └── styles         # 全局样式文件
│   ├── components         # 公共组件
│   │   ├── common         # 通用组件
│   │   └── business       # 业务组件
│   ├── pages              # 页面文件
│   │   └── index         # 首页 (其他页面开发中...)
│   ├── stores             # Pinia 状态管理
│   └── utils              # 工具函数
├── static                  # 不需要编译的静态资源
├── .env                    # 环境变量
├── .env.development       # 开发环境变量
├── .env.production        # 生产环境变量
├── .eslintrc.js           # ESLint 配置
├── .gitignore             # Git 忽略文件
├── package.json           # 项目依赖配置
├── pnpm-lock.yaml         # 依赖版本锁定文件
├── tailwind.config.js     # TailwindCSS 配置
├── vite.config.ts         # Vite 配置
└── README.md              # 项目说明文档
```

### 目录说明

#### `/src/api`

- 统一管理后端接口调用
- 包含请求拦截器和响应处理
- 按功能模块组织接口文件

#### `/src/components`

- `common/`: 基础 UI 组件
  - 按钮、输入框等通用组件
  - 遵循统一的设计规范
- `business/`: 业务组件
  - 当前阶段主要包含首页相关组件
  - 后续会扩展其他功能模块的组件

#### `/src/pages`

- 目前主要开发首页模块
- 后续计划开发模块：
  - AI 聊天
  - 树洞社区
  - 用户中心

#### `/src/stores`

- 基于 Pinia 的状态管理
- 存储全局共享数据
- 用户信息、主题配置等

#### `/src/utils`

- 工具函数集合
- 常量定义
- 通用辅助方法
