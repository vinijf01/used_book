// src/axios.js
import axios from 'axios';

const baseURL = 'http://localhost:8000';

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor: Tambah CSRF + Bearer Token
api.interceptors.request.use(
    async (config) => {
        // ✅ Tambah Authorization Bearer Token jika tersedia
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // ✅ Ambil CSRF token untuk metode yang butuh
        const csrfMethods = ['post', 'put', 'delete', 'patch'];
        if (csrfMethods.includes(config.method)) {
            await axios.get(`${baseURL}/sanctum/csrf-cookie`, {
                withCredentials: true,
            });
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
