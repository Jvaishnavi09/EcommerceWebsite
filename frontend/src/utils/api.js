import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL_UPLOADS,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
