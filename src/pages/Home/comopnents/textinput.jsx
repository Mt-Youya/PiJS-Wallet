import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/ui/dialog.jsx"
import { Button } from "@/ui/button.jsx"
import { Textarea } from "@/ui/textarea.jsx"
import { paymentInfo, paymentStatus, submitPayment } from "@/apis/auth.js"
import { UserInfoContext } from "@/contexts/userInfo.jsx"
import { toast } from "sonner"

function TextInput() {
    const { userinfo } = useContext(UserInfoContext)
    const { t } = useTranslation()
    const [isPaid, setIsPaid] = useState(userinfo?.isPaid)
    const [loading, setLoading] = useState(false)
    const [approval, setApproval] = useState(false)

    async function handlePay() {
        if (!userinfo) return toast("请先连接钱包!")
        setLoading(true)
        const { dataL: payInfo } = await paymentInfo()

        if (payInfo) {
            const { data: { message, success } = {} } = await submitPayment({ ...payInfo, address: userinfo?.wallet })
            setApproval(success)
            toast(message)
            const timer = setInterval(async () => {
                const { data } = await paymentStatus()
                if (data?.completed) {
                    toast("支付成功!")
                    clearInterval(timer)
                    setLoading(false)
                    setIsPaid(true)
                }
            }, 2000)
        }
    }

    return (
        <>
            <h2 className="text-white text-xl my-4 block">{t("PIJSwap 全球节点合伙人")}</h2>
            <div className="p-4 my-4 border-solid-grey">
                <Textarea className="border data-[hover]:shadow data-[focus]:bg-blue-100 block w-full h-32 bg-[#2A2A2A] rounded-lg" />
            </div>
            {
                !isPaid ?
                    <Dialog as="div" className="relative z-10 focus:outline-none">
                        <DialogTrigger className="bg-primary p-3 rounded-xl w-[calc(100%-2rem)] m-auto block" onClick={handlePay}>
                            {t("支付100USDT参与活动")}
                        </DialogTrigger>
                        <DialogContent
                            className="max-w-md text-center text-white border-none w-7/12 rounded-xl bg-white/5 p-6 backdrop-blur-2xl "
                        >
                            {loading ? !approval ? <span>{t("批准100USDT参与私募")}</span> : <span>{t("支付100USDT参与私募")}</span> : (
                                <div className="mt-4">
                                    <p>支付完成，您已完成私募</p>
                                    <br />
                                    <DialogClose className="w-30 h-12 bg-primary rounded-md text-black"> 知道了 </DialogClose>
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
