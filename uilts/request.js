import axios from "axios";
import vm from "vue";

axios.defaults.baseURL = "http://127.0.0.1:7001";
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
    // debugger;
    if (data.err || false) {
      console.log(data.msg);
      vm.$Message.error(data.msg);
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
