import { useState } from "react"
import Card from "@/components/Card.jsx"
import Header from "@/layouts/header.jsx"
import Bar from "./comopnents/bar.jsx"
import Textarea from "./comopnents/textinput.jsx"
import Cell from "./comopnents/cell.jsx"
import Rights from "./comopnents/rights.jsx"
import Binding from "../../components/Binding.jsx"
import Exchange from "../../components/Exchange.jsx"
import AccountsProvider from "../../contexts/accounts.jsx"

function Home() {

    const [bindingOpen, setBindingOpen] = useState(false)
    const [exchangeOpen, setExchangeOpen] = useState(false)
    return (
        <>
            <Header />
            <Bar />
            <Card title="我的JS" dollar={"1,000,000"} description="PIJSwap账号绑定"
                  onClick={() => setBindingOpen(false)} />
            <Card title="我的PiJS" dollar={"1,000,000"}
                  description={<span>绑定PIJSwap账号<br />使用账号内JS兑换PiJS</span>}
                  onClick={() => setExchangeOpen(false)}
                  footer={<div className="text-right pt-2">
                      <p className="h-px w-[calc(100%+24px)] -ml-3 bg-[#2A2C30] mb-1" />
                      <span className="text-[#5D6167]">兑换截至时间</span> &nbsp; <span>2025-3-1 23:59:59</span>
                  </div>}
            />
            <AccountsProvider>
                <Binding open={bindingOpen} setOpen={setBindingOpen} />
                <Exchange open={exchangeOpen} setOpen={setExchangeOpen} />
            </AccountsProvider>
            <Textarea />
            <Cell />
            <Rights />
            <div className="w-[calc(100%+2rem)] -ml-4">
                <img className="w-full block" src="/assets/Publicity.png" alt="publicity" />
            </div>
        </>
    )
}

export default Home
