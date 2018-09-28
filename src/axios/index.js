import axios from 'axios'
import qs from 'qs'
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/' : '/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;'
    }
});
instance.interceptors.request.use((config) => {
    if (config.method === 'post') {
        //如果是post请求则进行序列化处理
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
instance.interceptors.response.use((res) => {
    if (res.status !== 200) {
        return Promise.reject(res);
    }

    return res;
}, (error) => {
    //404等问题可以在这里处理
    return Promise.reject(error);
});
export default instance