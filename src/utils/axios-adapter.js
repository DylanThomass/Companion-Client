// axios适配器
const adapter = (config) => {
  return new Promise((resolve, reject) => {
    const {
      url,
      method,
      data,
      params,
      headers = {},
      baseURL,
      timeout,
    } = config;

    // 确保 URL 是完整的
    const fullUrl = url.startsWith("http")
      ? url
      : `http://localhost:3000${url}`;
    const key = `${method?.toUpperCase() || "GET"}:${fullUrl}`;

    console.log("准备发送请求:", key);
    console.log("当前mock列表:", Array.from(uni.$mockRequests?.keys() || []));

    // 检查是否有对应的 mock 数据
    if (uni.$mockRequests?.has(key)) {
      console.log("找到mock数据");
      const mockResponse = uni.$mockRequests.get(key);

      // 模拟延迟
      setTimeout(() => {
        resolve({
          status: 200,
          statusText: "OK",
          data: mockResponse,
          headers: {},
          config,
          request: null,
        });
      }, 200);
      return;
    }

    console.log("未找到mock数据，发起实际请求:", fullUrl);

    // 确保 header 是对象
    const header = {
      "Content-Type": "application/json",
      ...headers,
    };

    uni.request({
      url: fullUrl,
      data: method === "GET" ? params : data,
      method: method?.toUpperCase() || "GET",
      header,
      timeout: timeout || 6000,
      success: (response) => {
        resolve({
          status: response.statusCode,
          statusText: response.errMsg,
          data: response.data,
          headers: response.header,
          config,
          request: null,
        });
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};

export default adapter;
