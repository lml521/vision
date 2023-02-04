import axios from 'axios'

export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL:'https://www.bookbook.cc/api',
        timeout: 50000,
        method:config.method||"GET",
    })
    // 2.1.请求拦截的作用
    instance.interceptors.request.use(config => {
       return config
    }, err => {
        return Promise.reject(err)
    })
    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
        return Promise.resolve(res.data)
    }, err => {
        return Promise.reject(err)
    })
    // 3.发送真正的网络请求
    return instance(config)
}