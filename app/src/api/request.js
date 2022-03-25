// axios二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入store仓库
import store from '@/store'
// 引入进度条样式
import "nprogress/nprogress.css"

const requests = axios.create({
  baseURL: "/api",
  timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  // 判断uuid_token
  if (store.state.Detail.uuid_token) {
    // 给请求头添加一个字段
    config.headers.userTempId = store.state.Detail.uuid_token
  }
  // 需要token给服务器
  if (store.state.User.token) {
    config.headers.token = store.state.User.token
  }
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, (error) => {
  return Promise.reject(error)
})

//对外暴露
export default requests
