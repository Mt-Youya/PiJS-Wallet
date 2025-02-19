import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { accountStore } from "@/stores/accounts.js"
import { DialogClose, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog.jsx"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form.jsx"
import { Button } from "../ui/button.jsx"
import { Input } from "../ui/input.jsx"
import { exchange, exchangeConfig } from "@/apis/auth.js"
import { useToast } from "@/hooks/useToast.js"
import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

function Exchange() {
    const { isBinding, isJoin } = accountStore()
    const [exchangeOptions, setExchangeOptions] = useState(null)

    // if (!isBinding || !isJoin) {
    //     const text = !isBinding ? "绑定PIJS账号" : "完成活动"
    //     return (
    //         <DialogHeader className="w-full h-full text-center mx-auto flex flex-col gap-4 justify-center items-center">
    //             <DialogTitle className="text-white text-center my-4">{`请先${text}再兑换`}</DialogTitle>
    //             <DialogClose className="text-black w-1/2 h-12 rounded-lg bg-primary"> 知道了 </DialogClose>
    //             <DialogDescription />
    //         </DialogHeader>
    //     )
    // }

    async function handleExchange(params) {
        const { success, data: { message } } = await exchange(params)
        useToast(message, success)
    }

    const FormSchema = z.object({
        from: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        to: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    })
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            from: "",
            to: "",
        },
    })

    useEffect(() => {
        exchangeConfig().then(({ data }) => setExchangeOptions(data))
    }, [])

    return (
        <>
            <DialogHeader className="w-full">
                <DialogTitle className="w-full mr-auto flex gap-2 justify-start items-center text-primary">
                    <img src="/assets/ArrowLeft.svg" alt="ArrowLeft" />
                    <span>JS账号兑换PIJS</span>
                </DialogTitle>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleExchange)}
                      className="w-full   rounded-xl  ">
                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm/6 font-medium text-[#ABB1B9]">从</FormLabel>
                                <div className="rounded-lg  p-1.5 flex justify-between relative">
                                    <div className="rounded-lg p-1.5 flex gap-2 absolute top-2 left-2"><img src="/assets/Exchange.svg"
                                                                                                            alt="Exchange" /> JS
                                    </div>
                                    <FormControl>
                                        <Input className="outline-[#494E54] border-[#494E54] text-right" value={0} {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage className="text-white" />
                            </FormItem>
                        )}
                    />
                    <DialogDescription className="flex justify-center items-center gap-4 mt-4">
                        <div className="bg-[#494E54] rounded-lg p-1" ><ArrowDown /></div> 1{}PiJS = 2{}JS
                    </DialogDescription>
                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm/6 font-medium text-[#ABB1B9]">登录密码验证</FormLabel>
                                <div className="rounded-lg  p-1.5 flex justify-between relative">
                                    <div className="rounded-lg p-1.5 flex gap-2 absolute top-2 left-2">
                                        <img src="/assets/Exchange.svg" alt="Exchange" /> PIJS
                                    </div>
                                    <FormControl>
                                        <Input className="outline-[#494E54] border-[#494E54] text-right" value={0} {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage className="text-white" />
                                <FormDescription> 绑定后不可修改，请认真确认 </FormDescription>
                            </FormItem>
                        )}
                    />

                    <Button className="bg-primary mt-10 w-full h-12 rounded-lg text-center text-black" type="submit"> 兑换 </Button>
                </form>
            </Form>
        </>
    )
}

export default Exchange
