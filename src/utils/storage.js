import Cookies from "js-cookie"

export const Local = {
    set(key, val) {
        window.localStorage.setItem(key, JSON.stringify(val))
    },
    get(key) {
        let json = window.localStorage.getItem(key)
        return JSON.parse(json)
    },
    remove(key) {
        window.localStorage.removeItem(key)
    },
    clear() {
        window.localStorage.clear()
    },
}

export const Session = {
    set(key, val) {
        if (key === "token") return Cookies.set(key, val)
        window.sessionStorage.setItem(key, JSON.stringify(val))
    },
    get(key) {
        if (key === "token") return Cookies.get(key)
        let json = window.sessionStorage.getItem(key)
        return JSON.parse(json)
    },
    remove(key) {
        if (key === "token") return Cookies.remove(key)
        window.sessionStorage.removeItem(key)
    },
    clear() {
        Cookies.remove("token")
        window.sessionStorage.clear()
    },
}
