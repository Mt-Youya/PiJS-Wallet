import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Session } from "@/utils/storage.js"

export const userinfoStore = create(persist(set => ({
    userinfo: Session.get("userInfo"),
    setUserinfo: userinfo => set(() => {
        userinfo.isConnected = true
        Session.set("userInfo", userinfo)
        return { userinfo }
    }),
})))
