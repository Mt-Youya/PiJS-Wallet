import axios from "axios"
import { Local, Session } from "@/utils/storage.js"

const service = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_URL : "/",
    timeout: 200000,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
})

// http method
export const METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
}

service.interceptors.request.use(
    (config) => {
        if (Session.get("token")) {
            config.headers["Authorization"] = `Bearer ${Session.get("token")}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

service.interceptors.response.use((response) => {
        const res = response.data
        if (res.code === 401) {
            Session.remove("token")
            Local.remove("token")
        }
        if (res.code && res.code !== 0) {
            return res
        }
        return Promise.reject(res.message || "Error")
    },
    (error) => {
        return Promise.reject(error)
    },
)

export const FileHeader = { "Content-Type": "multipart/form-data" }

export default service
