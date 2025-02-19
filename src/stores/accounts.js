import { create } from "zustand"

export const accountStore = create(set => ({
    isLogin: false,
    setIsLogin: isLogin => set(() => ({ isLogin })),
    isBinding: false,
    setIsBinding: isBinding => set(() => ({ isBinding })),
    isJoin: false,
    setIsJoin: isJoin => set(() => ({ isJoin })),
    isBindingRecommend: false,
    setIsBindingRecommend: isBindingRecommend => set(() => ({ isBindingRecommend })),
    isConnected: false,
    setIsConnected: isConnected => set(() => ({ isConnected })),
}))
