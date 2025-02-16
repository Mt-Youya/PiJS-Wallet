import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@headlessui/react"
import { useAppKit } from "@reown/appkit/react"
import { useAppKitAccount } from "@reown/appkit-core/react"

function Header() {
    const { t, i18n } = useTranslation()
    const [expanded, setExpanded] = useState(false)

    const [switchLanguage, setSwitchLanguage] = useState(false)

    function handleSwitchLang(lang) {
        i18n.changeLanguage(lang)
        setExpanded(false)
        setSwitchLanguage(false)
    }

    const [loading, setLoading] = useState(false)
    const { open, close } = useAppKit()
    const { isConnected, allAccounts } = useAppKitAccount()

    async function handleConnect() {
        if (isConnected) return
        setLoading(true)
        await open().catch(e => console.log(e))
        setLoading(false)
    }

    async function handleExit() {
        if (!isConnected) return
        setLoading(true)
        await close().catch(e => console.log(e))
        setLoading(false)
    }

    return (
        <>
            <header className="text-sm flex space-b w-full justify-between">
                <img className="h-9" src="/assets/Logo.svg" alt="Logo" />
                <nav className="flex gap-2 justify-between items-center">
                    <Button className="bg-[#F4C134] py-2 px-4 rounded-lg max-w-40 overflow-hidden text-ellipsis"
                            onClick={handleConnect}>
                        {loading ? "connect ..." : !isConnected && t("连接钱包")}
                        {allAccounts.map(account => account.address)}
                    </Button>
                    <img src="/assets/Expand.svg" alt="Expand" onClick={() => setExpanded(prev => !prev)} />
                </nav>
            </header>

            <div
                className={`fixed inset-0 bg-[#00000090] pointer-event text-white overflow-hidden transition-all duration-300 ${expanded ? "h-screen" : "h-1"}`}
            >
                <div className="bg-black overflow-hidden p-5">
                    <button className="ml-auto block" onClick={() => setExpanded(false)}>
                        <img className="flex justify-end items-end flex-end" src="/assets/Close.svg" alt="close" />
                    </button>
                    <p className="w-[calc(100%+10rem)] bg-[#2A2C30] h-1 -ml-10 my-4" />
                    <ul className="*:flex *:gap-4 *:py-2">
                        <li><img className="w-5 h-5 aspect-square" src="/assets/Home.svg" alt="Home" /> 首页</li>
                        <li className="relative" onClick={() => setSwitchLanguage(prevState => !prevState)}>
                            <img className="w-5 h-5 aspect-square" src="/assets/Language.svg" alt="Language" /> 语言
                            <img
                                className={`w-5 h-5 aspect-square block ml-auto transition-all ${switchLanguage ? "rotate-180" : "rotate-0"}`}
                                src="/assets/Dropdown.svg"
                                alt="Dropdown" />
                        </li>
                        <div className="ml-9" style={{ padding: 0 }}>
                            <ol className={`${!switchLanguage ? "hidden" : "block"} *:py-2`}>
                                <li onClick={() => handleSwitchLang("zh")}>简体中文</li>
                                <li onClick={() => handleSwitchLang("en")}>English</li>
                            </ol>
                        </div>
                        <li onClick={handleExit}>
                            <img className="w-5 h-5 aspect-square" src="/assets/Exit.svg" alt="Exit" /> 断开连接
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header
