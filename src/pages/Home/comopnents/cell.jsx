import { useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { fundConfig } from "@/apis/auth.js"
import { cellFolderStore } from "@/stores/cellFolder.js"
import SplitNumberSquare from "@/components/SplitNumberSquare.jsx"

function Cell() {
    const { t } = useTranslation()
    const { cellOptions: options, setCellOptions } = cellFolderStore()

    async function getOptions() {
        fundConfig().then(({ data }) => setCellOptions(data))
    }

    const sellRate = useMemo(() => (options?.used / options?.total * 100).toFixed(2), [options?.used, options?.total])

    useEffect(() => {
        getOptions()
    }, [])
    return (
        <>
            <div className="rounded-xl bg-[#181A20] border-solid-grey text-white mt-4 mb-1">
                <div className="p-3">
                    <SplitNumberSquare number={options?.used} />
                    <span className="text-white text-right block mt-3">{t("已售卖")}</span>
                </div>
                <div className="rounded-full w-full h-2 bg-[#2A2C30] overflow-hidden">
                    <p className={`bg-primary h-full w-[calc(${sellRate}%)] rounded-full`}
                       style={{ width: `calc(${sellRate}% )` }} />
                </div>
            </div>
            <div className="flex justify-between text-white *:text-[#ABB1B9]">
                <span>{t("总份数")} {options?.total}</span>
                <span>{options?.remain} {t("未售出")}</span>
            </div>
        </>
    )
}

export default Cell
