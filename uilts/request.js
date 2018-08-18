import axios from "axios";
import { Message } from "iview";

axios.defaults.baseURL = "https://api.jef.site";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true;
// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    const data = response.data || {};
    if (data.err || false) {
      console.log(data.msg);
      Message.error(data.msg);
      return Promise.reject(data);
    }
    return data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
