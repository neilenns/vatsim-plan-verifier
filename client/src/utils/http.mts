import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { serverUrl, apiKey } from "../configs/planVerifierServer.mts";

class CustomHttp {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: serverUrl,
    });

    this.instance.defaults.headers.common["x-api-key"] = apiKey;
    this.instance.defaults.withCredentials = true;

    // Automatically add the authentication token if it exists
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token") ?? "";
        if (token !== "") {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      null,
      { synchronous: true }
    );
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
