import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { recomentIncome, rewardRank } from "@/apis/auth.js"
import { accountStore } from "@/stores/accounts.js"
import { userinfoStore } from "@/stores/userinfo.js"
import { incomeInfoStore } from "@/stores/income.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card.jsx"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/ui/dialog.jsx"
import SplitNumberSquare from "@/components/SplitNumberSquare.jsx"
import Copy from "@/components/Copy.jsx"
import TablePage from "@/components/TablePage.jsx"

function Rights() {
    const { t } = useTranslation()
    const { isConnected } = accountStore()
    const { userinfo } = userinfoStore()
    const { incomeInfo, setIncomeInfo } = incomeInfoStore()

    useEffect(() => {
        userinfo && recomentIncome().then(({ data }) => setIncomeInfo(data?.totalIncome || 0))
    }, [userinfo])

    const columns = [
        { dataIndex: "returnWallet", title: t("地址") },
        { dataIndex: "returnAmount", title: t("推荐奖励") },
    ]

    const [dataSource, setDataSource] = useState([])

    const pageParams = {
        current: 1,
        pageSize: 10,
        total: dataSource.length,
        get pageLen() {
            return Math.ceil(dataSource.length / this.pageSize)
        },
    }
    const [pagination, setPagination] = useState(pageParams)

    async function handlePageChange(params) {
        const { data } = await rewardRank(params)
        setDataSource(data?.list.map(item => ({ ...item, returnAmount: item.returnAmount + "$" })))
        setPagination({
            total: data?.total,
            pageSize: data?.pageSize,
            current: data?.pageNum,
            pageLen: data?.pages,
        })
    }

    useEffect(() => {
        handlePageChange({ pageNum: pagination.current, pageSize: pagination.pageSize })
    }, [])

    const inviteLink = useMemo(() => `${location.origin}/?inviteCode=${userinfo?.inviteCode}`, [userinfo?.inviteCode])

    return (
        <>
            <div className="flex my-5">
                <img src="/assets/Crown.svg" alt="crown" /> &nbsp;
                <span className="text-[#F4C134]">{t("生态多重权益体系：")}：</span>
            </div>

            <ul className="text-[#ABB1B9] list-disc pl-5 *:my-2 mb-10">
                <li>{t("享受1%交易手续费永久分红")};</li>
                <li>{t("凡Pi主网KYC未通过者可获得PIJS补偿质押挖矿")};</li>
                <li>{t("最优兑换比例JS兑换PIJS")};</li>
                <li>{t("独享PIJS头矿权益")};</li>
                <li>{t("优先购买PIJS白名单")};</li>
                <li>{t("获得未来生态产品优先权")};</li>
                <li>{t("参与PIJSwap生态DAO治理，享有最高投票权")}。</li>
            </ul>
            {isConnected ? (
                <Card className="text-[#ABB1B9] border-solid-grey px-3.5 py-4.5 mb-2">
                    <CardHeader className="p-0 ">
                        <CardTitle className="text-sm flex justify-between">
                            <span>{t("推荐奖励")}  </span>
                            <span className="flex gap-2">{t("我的推荐代码")}<Copy code={userinfo?.inviteCode ?? ""} /> </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                        <div className="flex justify-between">
                            <span className="flex gap-1 justify-center items-center">
                                <Dialog>
                                    <DialogContent className="border-[#685319] w-11/12 rounded-lg">
                                        <DialogTitle className="text-white text-center">
                                            {t("推荐榜单")} <DialogDescription />
                                        </DialogTitle>
                                        <TablePage
                                            columns={columns} dataSource={dataSource} pagination={pagination}
                                            onChange={handlePageChange}
                                        />
                                    </DialogContent>
                                    <DialogTrigger>
                                        <b className="font-bold text-xl"> {incomeInfo}</b> USDT
                                    </DialogTrigger>
                                </Dialog>
                                <img src="/assets/DirectionRight.svg" alt="DirectionRight" />
                            </span>
                            <SplitNumberSquare code={userinfo?.inviteCode} size="small" />
                        </div>
                        <p>{t("邀请用户数")} 500</p>
                        <br />
                        <div className="flex justify-between">
                            <a className="text-white">
                                Referral Link：<br />
                                {inviteLink}
                            </a>
                            <span><Copy code={inviteLink} /></span>
                        </div>
                        <br />
                        <p>{t("分享你的邀请码，邀请更多人参与，您将获得 15% 的挖矿收益以及 5% 的节点返佣奖励！")}</p>
                    </CardContent>
                </Card>
            ) : (
                <Card className="text-[#ABB1B9] border-solid-grey px-3.5 py-4.5 mb-2">
                    <CardHeader className="p-0 ">
                        <CardTitle className="text-sm">{t("请连接您的钱包")}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                        <p className="text-xs leading-4">{t("分享你的邀请码，邀请更多人参与，您将获得 15% 的挖矿收益以及 5% 的节点返佣奖励！")}</p>
                    </CardContent>
                </Card>
            )}
        </>)
}

export default Rights
