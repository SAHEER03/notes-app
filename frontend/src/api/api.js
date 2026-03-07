// Import axios library to handle HTTP requests to the backend API
import axios from 'axios';

// create custom axios instance with base URL for API requests
const API = axios.create({

    // base url for all aoi request
    baseURL: 'http://localhost:5000/api', // Base URL for backend API
});

// Add a request interceptor to include JWT token in the Authorization header for authenticated requests
API.interceptors.request.use((config) => {
    
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // If token exists, add it to the Authorization header
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the modified config object
    return config;
});

// export request instance to be used in other parts of the application
export default API;

