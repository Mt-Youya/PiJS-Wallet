import { createContext, useState } from "react"

export const LanguageContext = createContext(null)

function LanguageProvider({ children }) {
    const [lang, setLang] = useState("zh")
    return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
