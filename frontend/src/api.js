import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({ baseURL: `http://localhost:3000/` });

api.interceptors.request.use(
    (config) => {
        // Get token
        const token = localStorage.getItem('accessToken');

        if (token) {
            const decoded = jwtDecode(token);
            const tokenExpiratio = decoded.exp;
            const now = Date.now() / 1000

            if (tokenExpiratio > now) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }

        return config 
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api