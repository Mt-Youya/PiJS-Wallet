import { useContext, useMemo, useState } from "react"
import { toast } from "sonner"
import { bindReferrer } from "@/apis/auth.js"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/ui/dialog.jsx"
import { AccountsContext } from "@/contexts/accounts.jsx"
import { UserInfoContext } from "@/contexts/userInfo.jsx"
import TablePage from "@/components/TablePage.jsx"

function Recommend({ trigger }) {
    const { setIsBindingRecommend } = useContext(AccountsContext)
    const { userinfo } = useContext(UserInfoContext)
    const [loading, setLoading] = useState(false)
    const inviteCode = useMemo(() => userinfo?.inviteCode, [userinfo])
    const columns = [
        { dataIndex: "Address" },
        { dataIndex: "Number of Nodes" },
        { dataIndex: "Contribution Rewards" },
    ]

    const dataSource = [
        { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        // { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        // { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        // { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        // { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        // { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
        { "Address": "123", "Number of Nodes": "213234", "Contribution Rewards": "dfghiadfbn " },
    ]

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: dataSource.length,
    })

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
                <DialogContent className="border-solid-grey p-4 py-12 pb-8 w-5/6 bg-[#0A0A0A]">
                    <DialogTitle className="text-white">绑定推荐码 <DialogDescription /></DialogTitle>
                    <ul className="flex justify-between my-4">
                        {inviteCode?.toString().split("").map((str, index) => (
                            <li key={index}
                                className="w-12 h-12 border-solid-grey text-white leading-10 text-center">{str}</li>
                        ))}
                    </ul>

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
