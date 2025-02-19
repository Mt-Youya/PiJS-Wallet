import { create } from "zustand"

export const accountStore = create(set => ({
    isLogin: false,
    setIsLogin: isLogin => set(state => ({ isLogin })),
    isBinding: false,
    setIsBinding: isBinding => set(state => ({ isBinding })),
    isSimu: false,
    setIsSimu: isSimu => set(state => ({ isSimu })),
    isBindingRecommend: false,
    setIsBindingRecommend: () => set(state => ({ isBindingRecommend: !state.isBindingRecommend })),
    isConnected: false,
    setIsConnected: isConnected => set(state => ({ isConnected })),
}))