import { createContext, useState } from "react"
import { Session } from "@/utils/storage.js"

export const UserInfoContext = createContext(null)

function UserInfoProvider({ children }) {
    const [userinfo, setUserinfo] = useState(Session.get("userInfo"))
    return <UserInfoContext.Provider value={{ userinfo, setUserinfo }}>{children}</UserInfoContext.Provider>
}

export default UserInfoProvider
