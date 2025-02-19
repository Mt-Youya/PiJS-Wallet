import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { clsx } from "clsx"
import { Loader } from "lucide-react"
import { useTranslation } from "react-i18next"
import { bindReferrer, userInfo } from "@/apis/auth.js"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/ui/dialog.jsx"
import { accountStore } from "@/stores/accounts.js"
import { userinfoStore } from "@/stores/userinfo.js"
import SplitInputCode from "@/components/SplitInputCode.jsx"

function Recommend({ trigger }) {
    const url = new URLSearchParams(location.search)
    const code = url.get("inviteCode")
    const { setIsBindingRecommend } = accountStore()
    const { userinfo, setUserinfo } = userinfoStore()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    const [inviteCode, setInviteCode] = useState("")

    async function handleBindingRecommend(e) {
        if (code) {
            toast.warning("您已经绑定上级!")
            return e.preventDefault()
        }
        handleBinding(inviteCode)
    }

    async function handleBinding(paramsCode) {
        if (!userinfo) return console.log("!userinfo handleBinding")
        setLoading(true)
        const { success, data: { message } } = await bindReferrer(paramsCode)
        if (success) {
            setIsBindingRecommend(true)
            const { data: info } = await userInfo()
            setUserinfo(info)
            setInviteCode("")
        }
        toast[success ? "success" : "error"](message)
        setLoading(false)
    }

    useEffect(() => {
        if (!code) return
        setInviteCode(code)
        handleBinding(code)
    }, [])

    const hasInviteCode = useMemo(() => !!(!userinfo?.hasReferrer || inviteCode), [inviteCode, userinfo?.hasReferrer])

    return (
        <Dialog modal>
            <DialogContent className="border-solid-grey p-4 py-12 pb-8 w-5/6 bg-[#0A0A0A]" onClick={e => e.stopPropagation()}>
                <DialogTitle className="text-white">{t("绑定推荐码")} <DialogDescription /></DialogTitle>
                <SplitInputCode comInCode={inviteCode} onChange={e => setInviteCode(e)} />
                <DialogFooter>
                    <Dialog modal>
                        <DialogTrigger
                            className="w-full h-12 bg-primary text-center rounded-lg flex justify-center gap-2 items-center"
                            onClick={handleBindingRecommend} disabled={loading}
                        >
                            {loading && <Loader className="animate-spin" />} {t("确认绑定")}
                        </DialogTrigger>
                    </Dialog>
                </DialogFooter>
            </DialogContent>
            <DialogTrigger
                className={clsx("flex gap-2", hasInviteCode && "text-gray-500")}
                onClick={e => e.stopPropagation() && (hasInviteCode && e.preventDefault())}
                disabled={hasInviteCode}
            >
                {trigger}
            </DialogTrigger>
        </Dialog>
    )
}

export default Recommend
