import { useEffect, useMemo } from "react"
import { t } from "i18next"
import { recomentIncome } from "@/apis/auth.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card.jsx"
import { accountStore } from "@/stores/accounts.js"
import { userinfoStore } from "@/stores/userinfo.js"
import SplitNumberSquare from "@/components/SplitNumberSquare.jsx"
import Copy from "@/components/Copy.jsx"
import { incomeInfoStore } from "@/stores/income.js"

function Rights() {
    const { isConnected } = accountStore()
    const { userinfo } = userinfoStore()
    const { incomeInfo, setIncomeInfo } = incomeInfoStore()
    const inviteCode = useMemo(() => userinfo?.inviteCode, [userinfo?.inviteCode])

    useEffect(() => {
        userinfo && recomentIncome().then(({ data }) => setIncomeInfo(data?.totalIncome || 0))
    }, [userinfo])

    return (
        <>
            <div className="flex my-5">
                <img src="/assets/Crown.svg" alt="crown" /> &nbsp;
                <span className="text-[#F4C134]">{t("PIJS 权益卡说明")}：</span>
            </div>

            <ul className="text-[#ABB1B9] list-disc pl-5 *:my-2 mb-10">
                <li>{t("白名单：提前5分钟购买代币")}</li>
                <li>{t("首次挖矿奖励：1-3天")}</li>
                <li>{t("1％交易费：分布式")}</li>
                <li>{t("优先访问：未来生态系统项目")}</li>
                <li>{t("LP质押提现：取消上述权利")}</li>
            </ul>
            {isConnected ? (
                <Card className="text-[#ABB1B9] border-solid-grey px-3.5 py-4.5 mb-2">
                    <CardHeader className="p-0 ">
                        <CardTitle className="text-sm flex justify-between">
                            <span>推荐奖励</span>
                            <span className="flex gap-2">我的推荐代码<Copy code={inviteCode} /> </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                        <div className="flex justify-between">
                            <span className="flex gap-1 justify-center items-center">
                                <b className="font-bold text-xl"> {incomeInfo}</b> USDT
                                <img src="/assets/DirectionRight.svg" alt="DirectionRight" />
                            </span>
                            <SplitNumberSquare number={inviteCode} size="small" />
                        </div>
                        <p>Invitation to 50 NFTs</p>
                        <br />
                        <div className="flex justify-between">
                            <a className="text-white">
                                Referral Link：<br />
                                https://abc.abc.com/inviteCode=?{inviteCode}
                            </a>
                            <span><Copy code={`https://abc.abc.com/inviteCode=?${inviteCode}`} /></span>
                        </div>
                        <br />
                        <p>分享你的邀请码，邀请更多人参与，您将获得 15% 的挖矿收益以及 5% 的节点返佣奖励！</p>
                    </CardContent>
                </Card>
            ) : (
                <Card className="text-[#ABB1B9] border-solid-grey px-3.5 py-4.5 mb-2">
                    <CardHeader className="p-0 ">
                        <CardTitle className="text-sm">请连接您的钱包</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                        <p className="text-xs leading-4">分享你的邀请码，邀请更多人参与，您将获得 15% 的挖矿收益以及 5%
                            的节点返佣奖励！</p>
                    </CardContent>
                </Card>
            )}
        </>
    )
}

export default Rights
