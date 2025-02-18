import { create } from "zustand"

export const cellFolderStore = create(set => ({
    cellOptions: null, setContractInfo: () => set(state => ({ cellOptions: state.cellOptions })),
}))
