import axios from "axios";

export const TIMEOUT = 60000;
export const BASE_URL = "http://192.168.50.56:8000";

const request = axios.create({
  timeout: TIMEOUT,
  baseURL: BASE_URL,
});

//拦截请求
request.interceptors.request.use((config) => {
  // const tokenValue = store.getState().login.token || "no token";

  // console.log("token", tokenValue);
  // if (!tokenValue) {
  //   return config;
  // }

  // config.headers["Authorization"] = tokenValue;
  return config;
});

//拦截响应
request.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    //对响应的错误做点什么
    return Promise.reject(error);
  }
);

export default request;
