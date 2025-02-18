import { create } from "zustand"

export const cellFolderStore = create(set => ({
    cellOptions: null, setCellOptions: () => set(state => ({ cellOptions: state.cellOptions })),
}))
