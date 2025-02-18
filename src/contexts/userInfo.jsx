import { createContext, useState } from "react"

export const UserInfoContext = createContext(null)

function UserInfoProvider({ children }) {
    const [userinfo, setUserinfo] = useState(null)
    return <UserInfoContext.Provider value={{ userinfo, setUserinfo }}>{children}</UserInfoContext.Provider>
}

export default UserInfoProvider
