import { useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/ui/dialog.jsx"
import { Button } from "@/ui/button.jsx"
import { Textarea } from "@/ui/textarea.jsx"
import { fundConfig, paymentInfo, paymentStatus, submitPayment } from "@/apis/auth.js"
import { cellFolderStore } from "@/stores/cellFolder.js"
import { contractInfoStore } from "@/stores/contract.js"
import { userinfoStore } from "@/stores/userinfo.js"
import { USDTAbi, Abi } from "@/constants/contract.json"
import { BrowserProvider, Contract } from "ethers"
import { Session } from "@/utils/storage.js"
import Loading from "@/components/Loading.jsx"

function TextInput() {
    const { userinfo, setUserinfo } = userinfoStore()
    const { setCellOptions } = cellFolderStore()
    const { contractInfo } = contractInfoStore()
    const { t } = useTranslation()
    const [isPaid, setIsPaid] = useState(userinfo?.isPaid)
    const [loading, setLoading] = useState(false)
    const [approval, setApproval] = useState(false)

    async function handlePay(e) {
        if (!userinfo) {
            setUserinfo(Session.get("userInfo"))
            e.preventDefault()
            return toast.warning("请先连接钱包!")
        }
        setLoading(true)
        const { data: payInfo } = await paymentInfo()

        if (payInfo) {
            const txHash = await SendTx(payInfo)
            const { data: { message, success } = {} } = await submitPayment({
                ...payInfo,
                address: userinfo?.wallet,
                txHash,
            })
            setApproval(success)
            if (!success) return toast.error(message)
            toast.success(message)
            const timer = setInterval(async () => {
                const { data } = await paymentStatus()
                if (data?.completed) {
                    toast.success("支付成功!")
                    clearInterval(timer)
                    setLoading(false)
                    setIsPaid(true)
                    fundConfig().then(({ data }) => setCellOptions({ cellOptions: data }))
                }
            }, 2000)
        }
    }

    async function SendTx(payInfo) {
        const usdtContractAddress = "0xa409A8e7dC971f0a2c8f311330276599E1227E8A"
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
        if (balance < paymentAmount) return toast.error("USDT余额不足，请先充值")

        const allowance = await usdtContract.allowance(address, contractAddress)
        if (allowance < paymentAmount) return toast.error("授权额度不足，请先授权")

        const paymentParams = [{ ...payInfo, amount: paymentAmount }]

        const payTx = await paymentContract.payWithUSDT(...paymentParams)
        return await payTx.wait()
    }

    return (
        <>
            <h2 className="text-white text-xl my-4 block">{t("PIJSwap 全球节点合伙人")}</h2>
            <div className="p-4 my-4 border-solid-grey">
                <Textarea
                    className="border data-[hover]:shadow data-[focus]:bg-blue-100 block w-full h-32 bg-[#2A2A2A] rounded-lg" />
            </div>
            {
                !isPaid ?
                    <Dialog as="div" className="relative z-10 focus:outline-none">
                        <DialogTrigger
                            className="bg-primary p-3 rounded-xl w-[calc(100%-2rem)] m-auto block"
                            onClick={handlePay}
                        >
                            {t("支付100USDT参与活动")}
                        </DialogTrigger>
                        <DialogContent
                            className="max-w-md text-center text-white border-none w-7/12 rounded-xl bg-white/5 p-6 backdrop-blur-2xl "
                        >
                            {loading && !approval ?
                                <>  <Loading /> <span>{t("批准100USDT参与活动")}</span>  </>
                                : <> <Loading /> <span>{t("支付100USDT参与活动")}</span> </>
                            }
                            {isPaid && (
                                <div className="mt-4">
                                    <p>支付完成，您已完成私募</p>
                                    <br />
                                    <DialogClose
                                        className="w-30 h-12 bg-primary rounded-md text-black"> 知道了 </DialogClose>
                                </div>
                            )}
                            <DialogTitle> <DialogDescription /> </DialogTitle>
                        </DialogContent>
                    </Dialog>
                    : (
                        <Button className="bg-[#5D6167] p-3 rounded-xl w-[calc(100%-2rem)] m-auto block" disabled>
                            您已完成私募
                        </Button>
                    )
            }

        </>
    )
}

export default TextInput
