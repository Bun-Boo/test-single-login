// src/api.js

const BASE_URL = 'http://172.16.10.79:3000/auth'; // Địa chỉ server Node.js của bạn

export const login = async (userName, password) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, password }),
        });
        const result = await response.json();
        if (response.ok) {
            return result.token; // Trả về token nếu đăng nhập thành công
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
};

export const logout = async (userName) => {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName }),
        });
        const result = await response.json();
        return result.message;
    } catch (error) {
        console.error('Logout error:', error.message);
        throw error;
    }
};

export const getProtectedResource = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/protected`, {
            method: 'GET',
            headers: {
                'Authorization': token,
            },
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Access denied');
        }
    } catch (error) {
        console.error('Protected resource error:', error.message);
        throw error;
    }
};
