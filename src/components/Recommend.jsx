import { useState } from "react"
import { toast } from "sonner"
import { bindReferrer } from "@/apis/auth.js"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/ui/dialog.jsx"
import { accountStore } from "@/stores/accounts.js"
import SplitInputCode from "@/components/SplitInputCode.jsx"
import { useTranslation } from "react-i18next"

function Recommend({ trigger }) {
    const { setIsBindingRecommend } = accountStore()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)


    const [inviteCode, setInviteCode] = useState("")

    async function handleBindingRecommend(e) {
        e.stopPropagation()
        setLoading(true)
        const { success } = await bindReferrer(inviteCode)
        if (success) {
            toast.success("绑定成功!")
            setIsBindingRecommend(true)
        }
        setLoading(false)
    }

    return (
        <>
            <Dialog>
                <DialogContent className="border-solid-grey p-4 py-12 pb-8 w-5/6 bg-[#0A0A0A]" onClick={e => e.stopPropagation()}>
                    <DialogTitle className="text-white">{t("绑定推荐码")} <DialogDescription /></DialogTitle>
                    <SplitInputCode onChange={e => setInviteCode(e)} />
                    <DialogFooter>
                        <Dialog>
                            <DialogTrigger
                                className="w-full h-12 bg-primary text-center rounded-lg"
                                onClick={handleBindingRecommend} disabled={loading}
                            >
                                {t("确认绑定")}
                            </DialogTrigger>
                        </Dialog>
                    </DialogFooter>
                </DialogContent>
                <DialogTrigger className="flex gap-2" onClick={e => e.stopPropagation()}> {trigger}</DialogTrigger>
            </Dialog>

        </>
    )
}

export default Recommend
