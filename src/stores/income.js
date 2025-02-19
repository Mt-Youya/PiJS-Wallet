import { create } from "zustand"

export const incomeInfoStore = create(set => ({
    incomeInfo: 0, setIncomeInfo: incomeInfo => set(() => ({ incomeInfo })),
}))
