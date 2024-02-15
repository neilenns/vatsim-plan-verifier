import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ENV } from "../env.mjs";

class CustomHttp {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: ENV.VITE_SERVER_URL,
    });

    this.instance.defaults.headers.common["x-api-key"] = ENV.VITE_API_KEY;
    this.instance.defaults.withCredentials = true;
  }

  authorized(token: string): AxiosInstance {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return this.instance;
  }

  // Seems like there should be a better way to do this but whatever.
  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config);
  }

  put(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.put(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, config);
  }

  patch(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.patch(url, data, config);
  }

  head(url: string, config?: AxiosRequestConfig) {
    return this.instance.head(url, config);
  }

  options(url: string, config?: AxiosRequestConfig) {
    return this.instance.options(url, config);
  }
}

const http = new CustomHttp();

export default http;
