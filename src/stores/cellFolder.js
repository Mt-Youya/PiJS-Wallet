import { create } from "zustand"

export const cellFolderStore = create(set => ({
    cellOptions: null, setCellOptions: cellOptions => set(() => ({ cellOptions })),
}))
