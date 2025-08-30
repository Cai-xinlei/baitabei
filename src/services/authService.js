import request from './request';

// 刷新token
const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('没有刷新令牌');
    }

    try {
        const response = await request.post('/auth/refresh', {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });

        const { token, refreshToken: newRefreshToken, expiresIn } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', newRefreshToken);

        return { token, refreshToken: newRefreshToken, expiresIn };
    } catch (error) {
        // 刷新失败，清除本地存储
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        throw error;
    }
};

// 登录
export const login = async (loginData) => {
    try {
        const response = await request.post('/auth/login', loginData);

        const { token, refreshToken, tokenType, id } = response;

        // 存储token到localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('tokenType', tokenType);
        localStorage.setItem('user', JSON.stringify({
            id,
            username: response?.username,
            email: response?.email,
            loginTime: response?.expiresAt,
            realName: response?.realName,
        }));
        return response;
    } catch (error) {
        throw error;
    }
};

// 注册
export const register = async (registerData) => {
    try {
        const response = await request.post('/auth/register', registerData);
        return response;
    } catch (error) {
        throw error;
    }
};

// 登出
export const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            await request.post('/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        // 清除本地存储的token
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('user')
        return true;
    } catch (error) {
        // 即使服务器登出失败，也清除本地token
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('user');
        throw error;
    }
};

// 获取用户信息
export const getUserInfo = async () => {
    try {
        const response = await request.get('/auth/profile');
        return response.userInfo;
    } catch (error) {
        throw error;
    }
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
    try {
        await refreshToken();
    } catch (error) {
        throw new Error('登录已过期，请重新登录');
    }
};

export default {
    login,
    register,
    logout,
    getUserInfo,
    refreshToken,
    checkAndRefreshToken
};
