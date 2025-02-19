import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { BrowserProvider, formatEther, JsonRpcSigner } from "ethers"
import { useAppKitAccount, useAppKitProvider, useDisconnect } from "@reown/appkit/react"
import { useAppKitWallet } from "@reown/appkit-wallet-button/react"
import { langStore } from "@/stores/lang.js"
import { userinfoStore } from "@/stores/userinfo.js"
import { contractInfoStore } from "@/stores/contract.js"
import { incomeInfoStore } from "@/stores/income.js"
import { accountStore } from "@/stores/accounts.js"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu.jsx"
import { connectWallet, recomentIncome, userInfo } from "@/apis/auth.js"
import { Local, Session } from "@/utils/storage.js"
import { Button } from "@/ui/button.jsx"
import { Toaster } from "@/ui/toaster.jsx"
import Recommend from "@/components/Recommend.jsx"

function Header() {
    const { i18n, t } = useTranslation()
    const { setLang } = langStore()
    const { setUserinfo } = userinfoStore()
    const { setContractInfo } = contractInfoStore()
    const { setIncomeInfo } = incomeInfoStore()
    const { setIsConnected } = accountStore()
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

    async function createContract() {
        const { address, chainId } = parsedCaiAddress
        const provider = new BrowserProvider(walletProvider, +chainId)
        const signer = new JsonRpcSigner(provider, address)
        const message = "Hello PiJS"
        const signature = await signer?.signMessage(message)
        // const USDTContract = new Contract(USDTAddress, USDTAbi, signer)
        // const USDTBalance = await USDTContract?.balanceOf?.(address)
        const balance = await provider.getBalance(address)
        const eth = formatEther(balance)
        return {
            address,
            signer,
            signature,
            message,
            provider,
            chainId,
            eth,
            // contract: USDTContract,
            // balance: USDTBalance && formatUnits(USDTBalance, 18),
        }
    }

    useEffect(() => {
        if (!isSuccess || !walletProvider || !parsedCaiAddress) return

        async function createSignature() {
            const contract = await createContract()
            setContractInfo(contract)
            const params = {
                walletAddress: contract?.address,
                signature: contract?.signature,
                timestamp: +new Date,
                message: contract?.message,
            }
            const { data } = await connectWallet(params)
            if (data?.token) {
                Session.set("token", data.token)
                Local.set("token", data.token)
                setIsConnected(true)
            }
            getUserinfo()
            recomentIncome().then(({ data }) => setIncomeInfo(data?.totalIncome || 0))
        }

        createSignature()
    }, [isSuccess, walletProvider, parsedCaiAddress])

    async function getUserinfo() {
        const { data } = await userInfo()
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
            const result = await loopConnect(wallet)
            if (result) break
        }
        setLoading(false)
    }

    async function handleExit() {
        if (!isConnected) return
        setLoading(true)
        await disconnect()
        toast.success("连接已断开!")
        setLoading(false)
        Session.clear()
        Local.clear()
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
                                        <Recommend trigger={(
                                            <>
                                                <img className="w-6 h-4.5" src="/assets/Binding.svg"
                                                     alt="Binding" />
                                                <span>绑定推荐码</span>
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
