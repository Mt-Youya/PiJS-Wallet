import { useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { BrowserProvider, JsonRpcSigner } from "ethers"
import { useAppKitAccount, useAppKitProvider, useDisconnect } from "@reown/appkit/react"
import { useAppKitWallet } from "@reown/appkit-wallet-button/react"
import { LanguageContext } from "../contexts/language.jsx"
import { UserInfoContext } from "@/contexts/userInfo.jsx"
import { Toaster } from "@/ui/sonner.jsx"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu.jsx"
import { connectWallet, userInfo } from "@/apis/auth.js"
import { Local, Session } from "@/utils/storage.js"
import { Button } from "@/ui/button.jsx"
import Recommend from "@/components/Recommend.jsx"
import AccountsProvider from "@/contexts/accounts.jsx"

function Header() {
    const { i18n, t } = useTranslation()
    const { setLang } = useContext(LanguageContext)
    const { setUserinfo } = useContext(UserInfoContext)
    const [expanded, setExpanded] = useState(false)

    const [switchLanguage, setSwitchLanguage] = useState(false)

    function handleSwitchLang(lang) {
        i18n.changeLanguage(lang)
        setLang(lang)
        setExpanded(false)
        setSwitchLanguage(false)
    }

    const [loading, setLoading] = useState(false)
    const { isConnected, allAccounts, address } = useAppKitAccount()
    const { disconnect } = useDisconnect()
    const { walletProvider } = useAppKitProvider("eip155")
    const [parsedCaiAddress, setParsedCaiAddress] = useState(null)
    const { connect, isSuccess } = useAppKitWallet({
        onSuccess: parse => setParsedCaiAddress(parse),
    })

    useEffect(() => {
        if (!isSuccess || !walletProvider || !parsedCaiAddress) return

        async function createSignature() {
            const { address } = parsedCaiAddress
            const provider = new BrowserProvider(walletProvider)
            const signer = new JsonRpcSigner(provider, address)
            const message = "Hello PiJS"
            const signature = await signer?.signMessage(message)
            const params = {
                walletAddress: address,
                signature,
                timestamp: +new Date,
                message,
            }
            const { data } = await connectWallet(params)
            if (data?.token) {
                Session.set("token", data.token)
                Local.set("token", data.token)

            }
            getUserinfo()
        }

        createSignature()
    }, [isSuccess, walletProvider, parsedCaiAddress])

    async function getUserinfo() {
        const { data } = await userInfo()
        console.log("data", data)
        setUserinfo(data)
    }

    const wallets = ["metamask", "trust", "coinbase", "rainbow", "jupiter", "solflare", "coin98", "magic-eden", "backpack", "frontier", "phantom"]

    async function loopConnect(wallet = "metamask") {
        try {
            await connect(wallet)
            return true
        } catch (e) {
            return false
        }
    }

    async function handleConnect() {
        if (isConnected) return
        setLoading(true)
        for (const wallet of wallets) {
            const res = await loopConnect(wallet)
            if (res) break
        }
        setLoading(false)
    }

    async function handleExit() {
        if (!isConnected) return
        setLoading(true)
        await disconnect()
        toast("连接已断开!")
        setLoading(false)
    }

    return (
        <>
            <Toaster />
            <header className="text-sm flex space-b w-full justify-between">
                <img className="h-9" src="/assets/Logo.svg" alt="Logo" />
                <nav className="flex gap-2 justify-between items-center">
                    {
                        isConnected ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex gap-2 border-solid-grey p-2 text-[#ABB1B9]">
                                    <img className="w-4 h-4 aspect-square" src="/assets/Avatar.svg" alt="Expand" />
                                    <span className="max-w-20 overflow-hidden text-ellipsis"> {address} </span>
                                    <img src="/assets/Dropdown.svg" alt="Dropdown" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="bg-[#191E22] rounded-xl px-4 py-5 w-42 text-white border-none">
                                    <DropdownMenuItem>
                                        <AccountsProvider>
                                            <Recommend trigger={(
                                                <>
                                                    <img className="w-6 h-4.5" src="/assets/Binding.svg"
                                                         alt="Binding" />
                                                    <span>绑定推荐码</span>
                                                </>
                                            )} />
                                        </AccountsProvider>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleExit}>
                                        <img className="w-6 h-5 aspect-square" src="/assets/Exit.svg" alt="Exit" />
                                        {t("断开连接")}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button className="bg-[#F4C134] py-2 px-4 rounded-lg" onClick={handleConnect}>
                                {loading ? "connect ..." : !isConnected && t("连接钱包")}
                            </Button>
                        )
                    }
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
                        <li><img className="w-5 h-5 aspect-square" src="/assets/Home.svg" alt="Home" /> {t("首页")}</li>
                        <li className="relative" onClick={() => setSwitchLanguage(prevState => !prevState)}>
                            <img className="w-5 h-5 aspect-square" src="/assets/Language.svg"
                                 alt="Language" />
                            {t("语言")}
                            <img
                                className={`w-5 h-5 aspect-square block ml-auto transition-all ${switchLanguage ? "rotate-180" : "rotate-0"}`}
                                src="/assets/Dropdown.svg" alt="Dropdown" />
                        </li>
                        <div className="ml-9" style={{ padding: 0 }}>
                            <ol className={`${!switchLanguage ? "hidden" : "block"} *:py-2`}>
                                <li onClick={() => handleSwitchLang("zh")}>简体中文</li>
                                <li onClick={() => handleSwitchLang("en")}>English</li>
                            </ol>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header
