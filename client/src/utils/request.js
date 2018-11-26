import axios from 'axios'
import Vue from 'vue'

// 创建axios实例
const service = axios.create({
  baseURL: "http://localhost:3000/api", // api 的 base_url
  timeout: 5000 // 请求超时时间
})
export default service
