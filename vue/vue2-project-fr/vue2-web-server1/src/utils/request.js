import axios from 'axios'
import { Message } from 'element-ui' // MessageBox, 

const tokenK = 'asmith'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
console.log(process.env.VUE_APP_BASE_API, 'process.env.VUE_APP_BASE_API')


service.interceptors.request.use(
  config => {
    if (tokenK) {
      config.headers['X-Token'] = tokenK
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }  
)

service.interceptors.response.use(
  response => {
    const res = response.data
    // console.log(res, 'resssss')
    // if (res.code !== 200) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 3000
    //   })
    //   if (res.code === 403 || res.code === 401) {
    //     // to re-login
    //     // resetToken()
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
    return res
  },
  error => {
    console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 3000
    })
    return Promise.reject(error)
  }
)

export default service