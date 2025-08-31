import request from './request';

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
    const { data } = response;
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
export const register = async (registerData) => {
    const response = await request.post('/api/auth/register', registerData);
    const { data } = response;
    console.log(response, '注册的数据');
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
export const projectsSubmit = async (submitData) => {
    const response = await request.post('/api/project/submit', submitData);
    const { data } = response;
    return data;
};