import { toast } from "sonner"

function Copy({ code }) {
    function handleCopy() {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).then(() => {
                toast.success("复制成功!")
            }).catch(err => {
                console.error("复制失败:", err)
                toast.error("复制失败，请重试！")
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
                toast[successful ? "success" : "error"](successful ? "复制成功！" : "复制失败！")
            } catch (err) {
                console.error("复制失败:", err)
                toast.error("复制失败，请重试！")
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
