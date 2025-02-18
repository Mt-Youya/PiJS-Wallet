import { create } from "zustand"

export const contractInfoStore = create(set => ({
    contractInfo: null, setContractInfo: () => set(state => ({ contractInfo: state.contractInfo })),
}))
