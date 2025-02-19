import { create } from "zustand"
import { persist } from "zustand/middleware"

export const contractInfoStore = create(persist(set => ({
    contractInfo: null, setContractInfo: contractInfo => set(() => ({ contractInfo })),
})))
