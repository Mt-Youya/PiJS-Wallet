import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { LanguageContext } from "@/contexts/language.jsx"
import { clsx } from "clsx"

function Bar() {
    const { t } = useTranslation()
    const { lang } = useContext(LanguageContext)
    return (
        <div
            className={clsx("bg-[#f6b74c1a] w-[calc(100%+32px)] my-4 -ml-4 flex gap-2 py-3 px-4 text-xs", lang === "zh" ? "h-15" : "h-22")}>
            <div className="w-6 h-6">
                <img src="/assets/Info.svg" alt="info" />
            </div>
            <p className="text-[#ABB1B9]">
                {t("请使用Chrome浏览器并确保已安装OKX、MetaMask等插件钱包。")}
                <br />
                {t("手机用户请将链接复制到OKX或TP钱包APP中打开。")}
            </p>
        </div>
    )
}

export default Bar
