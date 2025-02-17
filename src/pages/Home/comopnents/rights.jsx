import { useTranslation } from "react-i18next"

function Rights() {
    const { t } = useTranslation()
    return (
        <>
            <div className="flex my-5">
                <img src="/assets/Crown.svg" alt="crown" /> &nbsp;
                <span className="text-[#F4C134]">{t("PIJS 权益卡说明")}：</span>
            </div>

            <ul className="text-[#ABB1B9] list-disc pl-5 *:my-2 mb-10">
                <li> {t("白名单：提前5分钟购买代币")}</li>
                <li> {t("首次挖矿奖励：1-3天")}</li>
                <li>{t("1％交易费：分布式")}</li>
                <li>{t("优先访问：未来生态系统项目")}</li>
                <li>{t("LP质押提现：取消上述权利")}</li>
            </ul>
        </>
    )
}

export default Rights
