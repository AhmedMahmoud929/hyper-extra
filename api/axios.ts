import axios from "axios";

const Axios = axios.create({
  baseURL: "https://ecomdev-d1485e509396.herokuapp.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default Axios;
