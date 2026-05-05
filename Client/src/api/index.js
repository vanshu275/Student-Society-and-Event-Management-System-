import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

// Ye middleware har request ke sath Token bhejega (One-click registration ke liye)
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);
export const fetchEvents = () => API.get('/events');
export const registerEvent = (id) => API.post(`/events/register/${id}`);