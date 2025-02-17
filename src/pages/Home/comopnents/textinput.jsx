import { useState } from "react"
import { t } from "i18next"
import { Dialog, DialogContent } from "@/ui/dialog.jsx"
import { Button } from "@/ui/button.jsx"
import { Textarea } from "@/ui/textarea.jsx"
import Loading from "@/components/Loading.jsx"

function TextInput() {
    const [isPaid, setIsPaid] = useState(false)

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    function handlePay() {
        setLoading(true)
        setOpen(true)
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
                    <Dialog open={open} onClose={() => setOpen(false)} as="div"
                            className="relative z-10 focus:outline-none">
                        {/*<DialogTrigger className="bg-primary p-3 rounded-xl w-[calc(100%-2rem)] m-auto block">*/}
                        <Button className="bg-primary p-3 rounded-xl w-[calc(100%-2rem)] m-auto block">
                            {t("支付100USDT参与活动")}
                        </Button>
                        {/*</DialogTrigger>*/}
                        <DialogContent
                            className="w-full max-w-md text-center  rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                            {loading && <Loading />}
                            <span>{t("批准100USDT参与私募")}</span> <br />
                            <span>{t("支付100USDT参与私募")}</span>
                            {!loading && (
                                <div className="mt-4">
                                    <Button
                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                        onClick={() => setOpen(false)}
                                    >
                                        知道了
                                    </Button>
                                </div>
                            )}
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
