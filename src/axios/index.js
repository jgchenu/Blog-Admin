import axios from 'axios'

import '../../node_modules/nprogress/nprogress.css'
import NProgress from 'nprogress'

// Dismiss manually and asynchronously

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});
instance.interceptors.request.use((config) => {
    // if (config.method === 'post') {
    //     //如果是post请求则进行序列化处理
    //     config.data = qs.stringify(config.data);
    // }
    NProgress.start()
    return config;
}, (error) => {
    return Promise.reject(error);
});
instance.interceptors.response.use((res) => {
    if (res.status !== 200) {
        return Promise.reject(res);
    }
    NProgress.done()
    return res;
}, (error) => {
    //404等问题可以在这里处理
    NProgress.done()
    return Promise.reject(error);

});
export default instance