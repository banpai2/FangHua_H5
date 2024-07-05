import axios from 'axios'
import { showToast } from 'vant'

const request = axios.create({
  baseURL: 'https://meikou-api.itheima.net/'
})

request.interceptors.request.use(
  (config) => {
    try {
      // mk.queryUser() 目前会有警告
      const user = mk.queryUser()
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
      }
    } catch (e) {
      showToast({ message: '美蔻SDK异常' })
    }
    return config
  },
  (err) => {
    Promise.reject(err)
  }
)

export { request }
