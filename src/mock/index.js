// 创建全局 mock 请求映射
uni.$mockRequests = new Map();

// 添加mock请求
const addMock = (url, method, response) => {
  const key = `${method}:${url}`;
  console.log("添加mock:", key);
  uni.$mockRequests.set(key, response);
};

// 添加 mock 数据
addMock("http://localhost:3000/api/login", "POST", {
  code: 200,
  message: "success",
  data: {
    token: "mock-token-123456",
    username: "测试用户",
  },
});

addMock("http://localhost:3000/api/user/info", "GET", {
  code: 200,
  message: "success",
  data: {
    id: "1",
    name: "测试用户",
    avatar: "https://via.placeholder.com/200x200",
    email: "test@example.com",
    phone: "13800138000",
  },
});

addMock("http://localhost:3000/api/test-401", "GET", {
  code: 401,
  message: "登录已过期",
  data: null,
});

addMock("http://localhost:3000/api/test-error", "GET", {
  code: 500,
  message: "服务器错误",
  data: null,
});
