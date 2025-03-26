import axios from 'axios';

const token = typeof window !== 'undefined' ? localStorage.getItem("simple-auth-token") : '';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_BACKEND_URL, // Replace with your API URL
    headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export default axiosInstance;
