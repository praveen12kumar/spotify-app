import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// Lazy load store inside the interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            import("../redux/store/store").then((module) => {
                const store = module.default;
                import("../redux/slices/auth-slice").then((authModule) => {
                    store.dispatch(authModule.logout());
                });
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
