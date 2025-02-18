import { create } from "zustand"

export const incomeInfoStore = create(set => ({
    incomeInfo: 0, setIncomeInfo: () => set(state => ({ incomeInfo: state.incomeInfo })),
}))
