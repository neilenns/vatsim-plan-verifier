import axios, { AxiosInstance } from "axios";

class CustomHttp {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({});
  }

  authorized(token: string): AxiosInstance {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return this.instance;
  }

  // You can add other custom methods here if needed
}

const http = new CustomHttp();

export default http;
