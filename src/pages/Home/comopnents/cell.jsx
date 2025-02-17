import SplitNumberSquare from "@/components/SplitNumberSquare.jsx"
import { useTranslation } from "react-i18next"

function Cell() {
    const sellRate = (123 / 3000 * 100).toFixed(2)
    const { t } = useTranslation()
    return (
        <>
            <div className="rounded-xl bg-[#181A20] border-solid-grey text-white mt-4 mb-1">
                <div className="p-3">
                    <SplitNumberSquare number={3000} />
                    <span className="text-white text-right block mt-3">{t("已售卖")}</span>
                </div>
                <div className="rounded-full w-full h-2 bg-[#2A2C30] overflow-hidden">
                    <p className={`bg-primary h-full w-[calc(${sellRate}%)] rounded-full`}
                       style={{ width: `calc(${sellRate}% )` }} />
                </div>
            </div>
            <div className="flex justify-between text-white *:text-[#ABB1B9]">
                <span>{t("总份数")} 3000</span>
                <span>82 {t("未售出")}</span>
            </div>
        </>
    )
}

export default Cell
