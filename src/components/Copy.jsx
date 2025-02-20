import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { useToast } from "@/hooks/useToast.js"

function Copy({ code }) {
    const { t } = useTranslation()

    function handleCopy() {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).then(() => toast.success(t("复制成功!"))).catch(err => {
                console.error("复制失败:", err)
                toast.error(t("复制失败，请重试！"))
            })
        } else {
            const textArea = document.createElement("textarea")
            textArea.value = code
            textArea.style.position = "fixed"
            textArea.style.top = "-9999px"
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()
            try {
                const successful = document.execCommand("copy")
                useToast(successful ? t("复制成功！") : t("复制失败！"), successful)
            } catch (err) {
                console.error("复制失败:", err)
                toast.error(t("复制失败，请重试！"))
            }
            document.body.removeChild(textArea)
        }
    }

    return (
        <>
            <img onClick={handleCopy} src="/assets/Copy.svg" alt="copy" />
        </>
    )
}

export default Copy
