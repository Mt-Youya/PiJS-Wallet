import { createContext, useState } from "react"

export const CellFolderContext = createContext(null)

function CellFolderProvider({ children }) {
    const [cellOptions, setCellOptions] = useState({ total: 0, used: 0, remain: 0 })
    return <CellFolderContext.Provider value={{ cellOptions, setCellOptions }}>{children}</CellFolderContext.Provider>
}

export default CellFolderProvider
