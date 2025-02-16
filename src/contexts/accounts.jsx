import { createContext, useState } from "react"

export const AccountsContext = createContext(null)

export default function AccountsProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false)
    const [isBinding, setIsBinding] = useState(false)
    const [isSimu, setIsSimu] = useState(false)
    return (
        <AccountsContext.Provider value={{
            isLogin, setIsLogin,
            isBinding, setIsBinding,
            isSimu, setIsSimu,
        }}>
            {children}
        </AccountsContext.Provider>
    )
}
