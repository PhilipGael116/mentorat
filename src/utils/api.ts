import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // Crucial for the CORS setup we did on the backend
});

// The "Token Injector" Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        
        // Ensure headers object is initialized (Axios usually does this, but being safe)
        if (!config.headers) {
            config.headers = {} as any;
        }

        if (token) {
            // Using set() is the safest way in Axios 1.x to ensure correct mapping
            if (typeof config.headers.set === 'function') {
                config.headers.set('Authorization', `Bearer ${token}`);
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor to handle Session Expiry (401)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized globally
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            // Optionally redirect to login or reload (window.location.href = '/sign-in')
            // but usually let the store or App.tsx handles this through state change
        }
        return Promise.reject(error);
    }
);

export default api;
