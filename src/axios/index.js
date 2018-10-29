import axios from 'axios'
import {
    message
} from 'antd'
import history from "@/router/history";
import '../../node_modules/nprogress/nprogress.css'
import NProgress from 'nprogress'

// Dismiss manually and asynchronously

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});
instance.interceptors.request.use((config) => {
    NProgress.start()
    const token = localStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + token;
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
    NProgress.done();
    if (error.response.status === 401) {
        localStorage.clear();
        message.error('权限过期失败，请重新登录', 1, () => {
            history.push('/login')
        });
    } else if (error.response.status === 500) {
        message.error(JSON.stringify(error.response.message))
    }
    return Promise.reject(error);

});
export default instance