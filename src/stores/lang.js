import { create } from "zustand"

export const langStore = create(set => ({
    lang: "zh", setLang: () => set(state => ({ lang: state.lang })),
}))
