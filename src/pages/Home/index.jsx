import { useTranslation } from "react-i18next"
import ProductCard from "@/components/ProductCard.jsx"
import Header from "@/layouts/header.jsx"
import Bar from "./comopnents/bar.jsx"
import Textarea from "./comopnents/textinput.jsx"
import Cell from "./comopnents/cell.jsx"
import Rights from "./comopnents/rights.jsx"
import Binding from "@/components/Binding.jsx"
import Exchange from "@/components/Exchange.jsx"
import AccountsProvider from "@/contexts/accounts.jsx"
import UserInfoProvider from "@/contexts/userInfo.jsx"
import CellFolderProvider from "@/contexts/cellFolder.jsx"

function Home() {
    const { t } = useTranslation()
    return (
        <>
            <UserInfoProvider>
                <Header />
                <Bar />
                <AccountsProvider>
                    <ProductCard title={t("我的JS")} dollar={"1,000,000"} description={t("PIJSwap账号绑定")}
                                 modalContent={<Binding />} />
                    <ProductCard title={t("我的PIJS")} dollar={"1,000,000"} modalContent={<Exchange />}
                                 description={<span>{t("绑定PIJSwap账号")}<br />{t("使用账号内JS兑换PIJS")}</span>}
                                 footer={(
                                     <div className="text-right pt-2">
                                         <p className="h-px w-[calc(100%+24px)] -ml-3 bg-[#2A2C30] mb-1" />
                                         <span className="text-[#5D6167]">{t("兑换截止时间")}</span> &nbsp;
                                         <span>2025-3-1 23:59:59</span>
                                     </div>
                                 )}
                    />
                </AccountsProvider>
                <CellFolderProvider>
                    <Textarea />
                    <Cell />
                </CellFolderProvider>
                <AccountsProvider>
                    <Rights />
                </AccountsProvider>
            </UserInfoProvider>
            <div className="w-[calc(100%+2rem)] -ml-4">
                <img className="w-full block" src="/assets/Publicity.png" alt="publicity" />
            </div>

        </>
    )
}

export default Home
