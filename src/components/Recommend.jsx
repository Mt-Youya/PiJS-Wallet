import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { clsx } from "clsx"
import { useTranslation } from "react-i18next"
import { bindReferrer, userInfo } from "@/apis/auth.js"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/ui/dialog.jsx"
import { accountStore } from "@/stores/accounts.js"
import { userinfoStore } from "@/stores/userinfo.js"
import SplitInputCode from "@/components/SplitInputCode.jsx"

function Recommend({ trigger }) {
    const { setIsBindingRecommend } = accountStore()
    const { userinfo, setUserinfo } = userinfoStore()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    const [inviteCode, setInviteCode] = useState("")

    async function handleBindingRecommend() {
        setLoading(true)
        const { success } = await bindReferrer(inviteCode)
        if (success) {
            toast.success("绑定成功!")
            setIsBindingRecommend(true)
            const info = await userInfo()
            setUserinfo(info)
        }
        setLoading(false)
    }

    useEffect(() => {
        const url = new URLSearchParams(location.search)
        setInviteCode(url.get("inviteCode"))
    }, [])

    const hasInviteCode = useMemo(() => userinfo?.hashReferer || inviteCode, [userinfo?.hashReferer, inviteCode])

    return (
        <Dialog modal>
            <DialogContent className="border-solid-grey p-4 py-12 pb-8 w-5/6 bg-[#0A0A0A]" onClick={e => e.stopPropagation()}>
                <DialogTitle className="text-white">{t("绑定推荐码")} <DialogDescription /></DialogTitle>
                <SplitInputCode comInCode={inviteCode} onChange={e => setInviteCode(e)} />
                <DialogFooter>
                    <Dialog modal>
                        <DialogTrigger
                            className="w-full h-12 bg-primary text-center rounded-lg"
                            onClick={handleBindingRecommend} disabled={loading}
                        >
                            {t("确认绑定")}
                        </DialogTrigger>
                    </Dialog>
                </DialogFooter>
            </DialogContent>
            <DialogTrigger
                className={clsx("flex gap-2", hasInviteCode && "text-gray-500")} onClick={e => e.stopPropagation()}
                disabled={hasInviteCode}
            >
                {trigger}
            </DialogTrigger>
        </Dialog>
    )
}

export default Recommend
