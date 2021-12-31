import axios from "axios";
import { AuthStore } from "./auth.store";

const api = axios.create({
  baseURL: `${window.location.origin}/api`
});

api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${AuthStore.token}`

  return config;
});

export default api;
