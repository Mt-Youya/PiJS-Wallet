import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Loader } from "lucide-react"
import { toast } from "sonner"
import { BrowserProvider, Contract } from "ethers"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/ui/dialog.jsx"
import { Button } from "@/ui/button.jsx"
import { fundConfig, paymentInfo, paymentStatus, submitPayment } from "@/apis/auth.js"
import { cellFolderStore } from "@/stores/cellFolder.js"
import { contractInfoStore } from "@/stores/contract.js"
import { userinfoStore } from "@/stores/userinfo.js"
import { USDTAbi, Abi } from "@/constants/contract.json"
import { Session } from "@/utils/storage.js"

function TextInput() {
    const { userinfo, setUserinfo } = userinfoStore()
    const { setCellOptions } = cellFolderStore()
    const { contractInfo } = contractInfoStore()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [approval, setApproval] = useState(false)
    const [open, setOpen] = useState(false)

    const isPaid = useMemo(() => userinfo?.isPaid, [userinfo?.isPaid])

    async function handlePay() {
        if (!userinfo) {
            setUserinfo(Session.get("userInfo"))
            return toast.warning(t("请先连接钱包!"))
        }
        setLoading(true)
        const { data: payInfo } = await paymentInfo()

        if (!payInfo) {
            return toast.error(t("支付信息查询失败！"))
        }
        const { hash: txHash } = await SendTx(payInfo)
        const { data: { message, success } = {} } = await submitPayment({
            ...payInfo,
            address: userinfo?.wallet,
            txHash,
        })
        setApproval(success)
        if (!success) return toast.error(t(message))
        toast.success(t(message))
        const timer = setInterval(async () => {
            const { data } = await paymentStatus()
            if (data?.completed) {
                toast.success(t("支付成功!"))
                clearInterval(timer)
                setLoading(false)
                setUserinfo({ ...userinfo, isPaid: true })
                fundConfig().then(({ data }) => setCellOptions(data))
            }
        }, 2000)
    }

    async function SendTx(payInfo) {
        const usdtContractAddress = payInfo?.usdtContractAddress
        const { contractAddress } = payInfo

        const { address } = contractInfo ?? {}
        const provider = new BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const usdtContract = new Contract(usdtContractAddress, USDTAbi, signer)
        const paymentContract = new Contract(contractAddress, Abi, signer)

        const paymentAmount = BigInt("100000000") // 100 USDT

        const approveTx = await usdtContract.approve(contractAddress, paymentAmount)
        await approveTx.wait()

        const balance = await usdtContract.balanceOf(address)
        if (balance < paymentAmount) {
            setOpen(false)
            return toast.error(t("USDT余额不足，请先充值"))
        }

        const allowance = await usdtContract.allowance(address, contractAddress)
        if (allowance < paymentAmount) {
            setOpen(false)
            return toast.error(t("授权额度不足，请先授权"))
        }

        const paymentParams = [{ ...payInfo, amount: paymentAmount }]

        const payTx = await paymentContract.payWithUSDT(...paymentParams)
        return await payTx.wait()
    }

    return (
        <>
            <h2 className="text-white text-xl my-4 block">{t("PIJSwap 全球节点合伙人")}</h2>
            <div className="p-4 my-4 border-solid-grey">
                <img className="rounded-lg"  src="/assets/PluginDraw.png" alt="PluginDraw"/>
            </div>
            {!isPaid ?
                <Dialog as="div" className="relative z-10 focus:outline-none">
                    <DialogTrigger
                        className="bg-primary p-3 rounded-xl w-[calc(100%-2rem)] m-auto block"
                        onClick={handlePay}
                    >
                        {t("支付100USDT认购")}
                    </DialogTrigger>
                    <DialogContent
                        className="max-w-md text-center text-white border-none w-7/12 rounded-xl bg-white/5 p-6 backdrop-blur-2xl justify-center items-center"
                    >
                        {loading && (
                            <>
                                {!approval && <Loader className="animate-spin scale-150 text-center block mx-auto my-4" />}
                                <span>{t(`${!approval ? "批准" : "支付"}100USDT认购`)}</span>
                            </>
                        )}
                        {isPaid && (
                            <div className="mt-4">
                                <p>{t("支付完成")}。{t("您已完成认购")}</p>
                                <br />
                                <DialogClose className="w-30 h-12 bg-primary rounded-md text-black"> 知道了 </DialogClose>
                            </div>
                        )}
                        <DialogTitle> <DialogDescription /> </DialogTitle>
                    </DialogContent>
                </Dialog>
                :
                <Button className="bg-[#5D6167] p-3 rounded-xl w-[calc(100%-2rem)] m-auto block" disabled>
                    {t("您已完成认购")}
                </Button>
            }
        </>
    )
}

export default TextInput
