import { useContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { bindReferrer, recomentList } from "@/apis/auth.js"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/ui/dialog.jsx"
import { AccountsContext } from "@/contexts/accounts.jsx"
import TablePage from "@/components/TablePage.jsx"
import SplitInputCode from "@/components/SplitInputCode.jsx"

function Recommend({ trigger }) {
    const { setIsBindingRecommend } = useContext(AccountsContext)
    const [loading, setLoading] = useState(false)
    const columns = [
        { dataIndex: "walletAddress", title: "Address" },
        { dataIndex: "payAmount", title: "Contribution Rewards" },
    ]

    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        recomentList().then(({ data }) => setDataSource(data))
    }, [])

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: dataSource.length,
    })

    const [inviteCode, setInviteCode] = useState("")

    async function handleBindingRecommend(e) {
        e.stopPropagation()
        setLoading(true)
        const { success } = await bindReferrer(inviteCode)
        if (success) {
            toast("绑定成功!")
            setIsBindingRecommend(true)
        }
        setLoading(false)
    }

    return (
        <>
            <Dialog>
                <DialogContent className="border-solid-grey p-4 py-12 pb-8 w-5/6 bg-[#0A0A0A]" onClick={e => e.stopPropagation()}>
                    <DialogTitle className="text-white">绑定推荐码 <DialogDescription /></DialogTitle>
                    <SplitInputCode onChange={e => setInviteCode(e)} />
                    <DialogFooter>
                        <Dialog>
                            <DialogTrigger className="w-full h-12 bg-primary text-center rounded-lg" onClick={handleBindingRecommend}
                                           disabled={loading}>
                                确认绑定
                            </DialogTrigger>
                            <DialogContent className="border-[#685319] w-11/12 rounded-lg">
                                <DialogTitle className="text-white text-center">
                                    推荐榜单 <DialogDescription />
                                </DialogTitle>
                                <TablePage columns={columns} dataSource={dataSource} pagination={pagination} />
                            </DialogContent>
                        </Dialog>
                    </DialogFooter>
                </DialogContent>
                <DialogTrigger className="flex gap-2" onClick={e => e.stopPropagation()}> {trigger}</DialogTrigger>
            </Dialog>

        </>
    )
}

export default Recommend
