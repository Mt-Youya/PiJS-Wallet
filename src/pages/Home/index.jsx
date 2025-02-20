import { useTranslation } from "react-i18next"
import { userinfoStore } from "@/stores/userinfo.js"
import ProductCard from "@/components/ProductCard.jsx"
import Header from "@/layouts/header.jsx"
import Bar from "./comopnents/bar.jsx"
import Textarea from "./comopnents/textinput.jsx"
import Cell from "./comopnents/cell.jsx"
import Rights from "./comopnents/rights.jsx"
import Exchange from "@/components/Exchange.jsx"
import Binding from "@/components/Binding.jsx"

function Home() {
    const { t } = useTranslation()
    const { userinfo } = userinfoStore()
    return (
        <>
            <Header />
            <Bar />
            <ProductCard
                title={t("我的JS")} dollar={userinfo?.points} description={t("APP账号绑定")}
                modalContent={<Binding />}
            />
            <ProductCard
                title={t("我的PIJS")} dollar={userinfo?.pijsPoints}
                description={<span>{t("绑定APP账号")}<br />{t("使用账号内JS兑换PiJS")}</span>}
                modalContent={<Exchange />}
                footer={(
                    <div className="text-right pt-2">
                        <p className="h-px w-[calc(100%+24px)] -ml-3 bg-[#2A2C30] mb-1" />
                        <span className="text-white">{t("成功认购节点合伙人之后即可开启JS兑换PIJS")}</span> &nbsp;
                    </div>
                )}
            />
            <Textarea />
            <Cell />
            <Rights />
            <div className="w-[calc(100%+2rem)] -ml-4">
                <img className="w-full block" src="/assets/Banner.png" alt="Banner" />
            </div>

        </>
    )
}

export default Home
