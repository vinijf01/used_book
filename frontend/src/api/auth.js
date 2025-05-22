// src/auth.js
import api from './axios';

// ✅ Register user baru
const register = async (name, email, password, password_confirmation) => {
    try {
        const response = await api.post('/api/register', {
            name,
            email,
            password,
            password_confirmation
        });

        if (response.data.success) {
            const token = response.data.data.token;
            localStorage.setItem('token', token); // Simpan token
            return response.data;
        } else {
            throw new Error(response.data.message || 'Registrasi gagal');
        }
    } catch (error) {
        console.error('Error saat registrasi:', error.response?.data || error.message);
        throw error;
    }
};

// ✅ Login user
const login = async (email, password) => {
    try {
        const response = await api.post('/api/login', { email, password });

        if (response.data.success) {
            const token = response.data.data.token;
            localStorage.setItem('token', token); // Simpan token
            return response.data;
        } else {
            throw new Error(response.data.message || 'Login gagal');
        }
    } catch (error) {
        console.error('Error saat login:', error.response?.data || error.message);
        throw error;
    }
};

// ✅ Logout user
const logout = async () => {
    try {
        await api.post('/api/logout');
        localStorage.removeItem('token'); // Hapus token dari localStorage
        console.log('Logout sukses');
    } catch (error) {
        console.error('Logout gagal:', error.response?.data || error.message);
        throw error;
    }
};

export { register, login, logout };
