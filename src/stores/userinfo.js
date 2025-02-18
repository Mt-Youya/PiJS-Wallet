import { create } from "zustand"
import { Session } from "@/utils/storage.js"

export const userinfoStore = create((set) => ({
    userinfo: Session.get("userInfo"), setUserinfo: () => set(state => ({ userinfo: state.userinfo })),
}))
