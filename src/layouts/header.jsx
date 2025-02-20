import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { BrowserProvider, formatEther, JsonRpcSigner } from "ethers"
import { useAppKitAccount, useAppKitProvider, useDisconnect } from "@reown/appkit/react"
import { useAppKitWallet } from "@reown/appkit-wallet-button/react"
import { useAppKit } from "@reown/appkit/react"
import { langStore } from "@/stores/lang.js"
import { userinfoStore } from "@/stores/userinfo.js"
import { contractInfoStore } from "@/stores/contract.js"
import { incomeInfoStore } from "@/stores/income.js"
import { accountStore } from "@/stores/accounts.js"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu.jsx"
import { bindReferrer, connectWallet, recomentIncome, userInfo } from "@/apis/auth.js"
import { Local, Session } from "@/utils/storage.js"
import { Button } from "@/ui/button.jsx"
import { Toaster } from "@/ui/toaster.jsx"
import Recommend from "@/components/Recommend.jsx"
import { useToast } from "@/hooks/useToast.js"

function Header() {
    const { i18n, t } = useTranslation()
    const { setLang } = langStore()
    const { userinfo, setUserinfo } = userinfoStore()
    const { setContractInfo } = contractInfoStore()
    const { setIncomeInfo } = incomeInfoStore()
    const { setIsConnected, setIsBindingRecommend } = accountStore()
    const [expanded, setExpanded] = useState(false)

    const [switchLanguage, setSwitchLanguage] = useState(false)

    function handleSwitchLang(lang) {
        i18n.changeLanguage(lang)
        setLang(lang)
        setExpanded(false)
        setSwitchLanguage(false)
    }

    const [loading, setLoading] = useState(false)
    const [parsedCaiAddress, setParsedCaiAddress] = useState(null)
    const { isConnected, address } = useAppKitAccount()
    const { disconnect } = useDisconnect()
    const { walletProvider } = useAppKitProvider("eip155")
    const { connect, isSuccess } = useAppKitWallet({
        onSuccess: parse => setParsedCaiAddress(parse),
    })
    const { open, close } = useAppKit()


    const addressDiff = useRef(address)
    useEffect(() => {
        (async function() {
            // 地址为空时
            if (!address) {
                if (addressDiff.current) {
                    // 之前有地址，现在断开了
                    setIsConnected(false)
                    Session.clear()
                    Local.clear()
                }
                addressDiff.current = address
                return
            }

            // 地址从空变为有值时
            if (!addressDiff.current) {
                await connectToGetToken(address)
                await getUserinfo()
                setContractInfo({ "address": address })
            }

            addressDiff.current = address
        })()
    }, [address])


    async function connectToGetToken(walletAddress) {
        const params = {
            "walletAddress": walletAddress,
        }
        const { data } = await connectWallet(params)
        if (data?.token) {
            Session.set("token", data.token)
            Local.set("token", data.token)
            setIsConnected(true)
        }
    }

    useEffect(() => {
        (async function() {
            if (!userinfo) return
            setIsConnected(true)
            if (code && !userinfo?.hasReferrer) {
                await getUserBinding()
            }
        })()
    }, [userinfo])

    async function getUserinfo() {
        const { data } = await userInfo()
        // 先更新状态
        data && setUserinfo(data)
        setIsBindingRecommend(data?.hasReferrer)
        recomentIncome().then(({ data }) => setIncomeInfo(data?.totalIncome || 0))
    }


    const wallets = ["metamask", "trust", "coinbase", "rainbow", "jupiter", "solflare", "coin98", "magic-eden", "backpack", "frontier", "phantom"]

    async function loopConnect() {
        try {
            await open()
            return true
        } catch (e) {
            return false
        }
    }

    async function handleConnect() {
        if (isConnected) return
        setLoading(true)

        // 尝试连接钱包

        const result = await loopConnect()
        if (result)

            setLoading(false)
    }

    async function handleExit() {
        if (!isConnected) return
        setLoading(true)
        await disconnect()
        toast.success(t("连接已断开!"))
        setLoading(false)
        Session.clear()
        Local.clear()
        setIsConnected(false)
    }

    function ellipsisMiddle(string, long = 4) {
        return string.slice(0, long) + "..." + string.slice(string.length - long, string.length)
    }

    const url = new URLSearchParams(location.search)
    const code = url.get("inviteCode")

    async function getUserBinding(args) {
        if (!userinfo) return console.log("!userinfo getUserBinding", userinfo)
        if (!code) return console.log("no inviteCode,not binding")

        if (userinfo?.hasReferrer) {
            return console.log("already bound referrer")
        }

        const { data: { success, message } } = await bindReferrer(code)
        if (success) {
            await getUserinfo()
        }
        useToast(message, success)
    }

    return (
        <>
            <Toaster />
            <header className="text-sm flex space-b w-full justify-between">
                <img className="h-9" src="/assets/Logo.svg" alt="Logo" />
                <nav className="flex gap-2 justify-between items-center">
                    {isConnected ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex gap-2 border-solid-grey p-2 text-[#ABB1B9]">
                                <img className="w-4 h-4 aspect-square" src="/assets/Avatar.svg" alt="Expand" />
                                <span className="max-w-20 overflow-hidden text-ellipsis"> {ellipsisMiddle(address)} </span>
                                <img src="/assets/Dropdown.svg" alt="Dropdown" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#191E22] rounded-xl px-4 py-5 text-white border-none">
                                <DropdownMenuItem>
                                    <Recommend trigger={(
                                        <>
                                            <img className="w-6 h-4.5" src="/assets/Binding.svg"
                                                 alt="Binding" />
                                            <span>{t("绑定推荐码")}</span>
                                        </>
                                    )} />
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
                    )}
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
