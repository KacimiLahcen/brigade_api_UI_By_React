import axios from 'axios';

/* axios instance with the base URL of Laravel API */
const api = axios.create({
    baseURL: 'http://localhost:8000/api', //Laravel server URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

/* interceptor to attach the sanctum token to every request automatically */
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;