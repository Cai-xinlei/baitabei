// src/utils/request.js
import axios from 'axios';
import { message } from 'antd';

// 创建axios实例
const service = axios.create({
    baseURL: 'http://39.106.56.69:8080/api', // 代理地址
    timeout: 15000,
    withCredentials: true
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 从localStorage中获取token
        const token = localStorage.getItem('token');
        if (token) {
            // 确保headers对象存在
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const { code, data, message: msg } = response.data;

        // 请求成功
        if (code === 200) {
            return data;

        }

        // token过期或无效
        if (code === 401) {
            // 清除本地存储的token
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('tokenType');
            localStorage.removeItem('user');
            // 跳转到登录页或执行其他操作
            window.location.href = '/#/login';
            return Promise.reject(new Error('登录已过期，请重新登录'));
        }

        // 其他业务错误
        const errorMsg = msg || '请求失败';
        message.error(errorMsg);
        return Promise.reject(new Error(errorMsg));
    },
    (error) => {
        const { response } = error;

        if (response) {
            switch (response.status) {
                case 401:
                    // token过期处理
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('tokenType');
                    localStorage.removeItem('user');
                    window.location.href = '/#/login';
                    message.error('登录已过期，请重新登录');
                    return Promise.reject(new Error('登录已过期，请重新登录'));
                case 403:
                    message.error('拒绝访问');
                    return Promise.reject(new Error('拒绝访问'));
                case 404:
                    message.error('请求资源不存在');
                    return Promise.reject(new Error('请求资源不存在'));
                case 500:
                    message.error('服务器内部错误');
                    return Promise.reject(new Error('服务器内部错误'));
                default:
                    message.error(`请求错误: ${response.status}`);
                    return Promise.reject(new Error(`请求错误: ${response.status}`));
            }
        } else {
            // 网络错误
            if (!window.navigator.onLine) {
                message.error('网络已断开，请检查网络连接');
                return Promise.reject(new Error('网络已断开，请检查网络连接'));
            }
            message.error('网络错误');
            return Promise.reject(new Error('网络错误'));
        }
    }
);

export default service;
