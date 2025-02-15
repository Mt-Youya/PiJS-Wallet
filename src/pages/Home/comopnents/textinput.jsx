import { Button, Textarea } from '@headlessui/react'
import { useState } from "react";

function TextInput() {
    const [isPaid, setIsPaid] = useState(false)

    function handlePay() {

    }

    return (
        <>
            <h2 className="text-white text-xl my-4 block">PIJSwap 全球私募</h2>
            <div className="p-4 my-4 border-solid-grey">
                <Textarea
                    className="border data-[hover]:shadow data-[focus]:bg-blue-100 block w-full h-32 bg-[#2A2A2A] rounded-lg"/>
            </div>
            {
                !isPaid ?
                    <Button className="bg-primary p-3 rounded-xl w-[calc(100%-2rem)] m-auto block"
                            onClick={handlePay}>
                        支付 100 USDT 参与私募
                    </Button>
                    : (
                        <Button className="bg-[#5D6167] p-3 rounded-xl w-[calc(100%-2rem)] m-auto block">
                            您已完成私募
                        </Button>
                    )
            }
        </>
    )
}

export default TextInput
