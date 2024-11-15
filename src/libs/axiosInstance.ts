import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5268/api"
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    console.log('xinterceptors.request Token', config.headers.Authorization);

    return config;
}, function (error) {
    console.log('interceptors.request')
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
}, function (error) {
    if (error.response == undefined) {
        window.location.href = '/login';
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized response, maybe redirect to login
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default axiosInstance;