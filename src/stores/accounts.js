import { create } from "zustand"

export const accountStore = create(set => ({
    isLogin: false, setIsLogin: () => set(state => ({ isLogin: !state.isLogin })),
    isBinding: false, setIsBinding: () => set(state => ({ isBinding: !state.isBinding })),
    isSimu: false, setIsSimu: () => set(state => ({ isSimu: !state.isSimu })),
    isBindingRecommend: false, setIsBindingRecommend: () => set(state => ({ isBindingRecommend: !state.isBindingRecommend })),
}))