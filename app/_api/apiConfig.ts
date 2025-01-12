import axios, {AxiosRequestConfig} from "axios";

const config: AxiosRequestConfig = {baseURL: "http://localhost:8080/", withCredentials : true}
export const api = axios.create(config);