import axios from 'axios';

// Create an instance of axios with default properties
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
    // Add other headers here
  },
  // You can add other default settings here (like `withCredentials: true` for CORS issues)
});

// Example of adding a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Perform actions before sending the request (like setting auth tokens)
    const token = localStorage.getItem('token'); // Replace with your token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Example of adding a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Any status code within the range of 2xx cause this function to trigger
    return response;
  },
  error => {
    // Any status codes outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
  }
);

export default axiosInstance;