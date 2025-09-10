import request from './request';
import axios from 'axios';
// 刷新token
export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('没有刷新令牌');
    }

    const response = await request.post('/api/auth/refresh', {}, {
        headers: {
            Authorization: `Bearer ${refreshToken}`
        }
    });

    const { data } = response;
    const { token, refreshToken: newRefreshToken, expiresIn } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', newRefreshToken);

    return { token, refreshToken: newRefreshToken, expiresIn };
};

// 登录
export const login = async (loginData) => {
    const response = await request.post('/api/auth/login', loginData);
    const { message, success, data } = response;
    if (!success) {
        return message.config({
            top: 250,
            duration: 2,
            maxCount: 3,
            rtl: true,
            prefixCls: 'my-message',
        });
    }
    const { accessToken, refreshToken } = data;
    // 存储token到localStorage
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify({
        id: data?.userId,
        username: data?.username,
        email: data?.email,
        expiresAt: data?.expiresAt,
        realName: data?.realName,
        avatar: data?.avatar,
        userId: data?.userId,
    }));
    return response;
};

// 注册
export const register = async (params) => {
    const response = await request.post('/api/auth/register', params);
    return response;
};

// 注册
export const queryProjectInfo = async (params) => {
    const response = await request.get('/api/project/my', params);
    return response;
};

// 登出
export const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            await request.post('/api/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
    } finally {
        // 清除本地存储的token
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('user');
    }
    return true;
};

// 获取用户信息
export const getUserInfo = async () => {
    const response = await request.get('/api/user/profile');
    const { data } = response;
    return data.userInfo;
};

// 检查token是否过期，如果过期则刷新
export const checkAndRefreshToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('未登录');
    }

    // 这里可以添加检查token是否过期的逻辑
    // 例如解析JWT token获取过期时间
    // 为了简化示例，我们直接尝试刷新token
    await refreshToken();
};


// 项目提交
export const projectSubmit = async (submitData) => {
    const response = await request.post('/api/project/submit', submitData);
    return response;
};

// 项目提交-更新项目
export const updateProject = async (submitData) => {
    const response = await request.post('/api/project/update', submitData);
    return response;
};

// 项目提交-查询
export const projectDetail = async (id) => {
    const response = await request.get(`/api/project/detail/${id}`);
    return response;
};


// 文件上传
export const uploadFile = async (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    // 配置上传参数
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',

        },
        // 如果需要上传进度回调
        onUploadProgress: onProgress
    };

    try {
        const response = await request.post('/api/files/upload', formData, config);
        const { data } = response;
        return data;
    } catch (error) {
        throw error;
    }
};


// 文件上传方法
export const customUpload = async (options) => {
    const { file, onSuccess, onError, onProgress } = options;

    try {
        // 创建 FormData 对象
        const formData = new FormData();
        formData.append('file', file);

        // 设置上传配置
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 添加 Authorization 头
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'token': localStorage.getItem('token')
            },
            // 监听上传进度
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                const percent = Math.round((loaded / total) * 100);
                onProgress({ percent });
            },
            withCredentials: true
        };

        // 发送 POST 请求
        const response = await axios.post(
            // 'http://39.106.56.69:8080/api/file/upload',
            `${window.location.origin}/api/file/upload`,
            formData,
            config
        );
        // 处理响应
        if (response.data.code === 200) {
            onSuccess({
                name: response?.data?.fileName,
                url: response.data.data,
                status: 'done',
                fileId: response?.data?.fileId,
                fileSize: response?.data?.fileSize,
                fileType: response?.data?.fileType
            });

            return {
                success: true,
                data: {
                    name: response?.data?.fileName,
                    url: response.data.data,
                    fileId: response?.data?.fileId,
                    fileSize: response?.data?.fileSize,
                    fileType: response?.data?.fileType
                }
            };
        } else {
            const errorMessage = response.data.message || '上传失败';
            onError(new Error(errorMessage));
            return {
                success: false,
                error: errorMessage
            };
        }
    } catch (error) {
        console.error('Upload error:', error);
        const errorMessage = error.response?.data?.message || error.message || '文件上传失败';
        onError(error);
        return {
            success: false,
            error: errorMessage
        };
    }
};