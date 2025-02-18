import request, { METHOD } from "../utils/request.js"

export function connectWallet(data) {
    return request({
        url: "/api/auth/connect",
        method: METHOD.POST,
        data,
    })
}

export function fundConfig() {
    return request({
        url: "/api/auth/fundConfig",
        method: METHOD.GET,
    })
}

export function bindPijs(data) {
    return request({
        url: "/api/wallet/bindPijs",
        method: METHOD.POST,
        data,
    })
}

export function estimateGas() {
    return request({
        url: "/api/wallet/estimateGas",
        method: METHOD.POST,
    })
}

export function payCheck() {
    return request({
        url: "/api/wallet/payCheck",
        method: METHOD.POST,
    })
}

export function userInfo() {
    return request({
        url: "/api/wallet/userInfo",
        method: METHOD.POST,
    })
}

export function paymentStatus() {
    return request({
        url: "/api/wallet/paymentStatus",
        method: METHOD.GET,
    })
}

export function submitPayment() {
    return request({
        url: "/api/wallet/submitPayment",
        method: METHOD.GET,
    })
}

export function paymentInfo() {
    return request({
        url: "/api/wallet/paymentInfo",
        method: METHOD.GET,
    })
}

export function bindReferrer(inviteCode) {
    return request({
        url: "/api/invite/bind-referrer",
        method: METHOD.POST,
        data: { inviteCode },
    })
}

export function exchange(data) {
    return request({
        url: "/api/points/exchange",
        method: METHOD.POST,
        data,
    })
}

export function exchangeConfig() {
    return request({
        url: "/api/points/exchangeConfig",
        method: METHOD.GET,
    })
}

export function exchangeRecords() {
    return request({
        url: "/api/points/exchangeRecords",
        method: METHOD.GET,
    })
}
