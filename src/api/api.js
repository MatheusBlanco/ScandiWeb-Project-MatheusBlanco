import axios from "axios";
import qs from "querystring-es3";

const token = localStorage.getItem("accessToken");

export const apiUrl =
  process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params),
});

api.interceptors.request.use((request) => {
  const logged = token;
  if (logged) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export default api;
