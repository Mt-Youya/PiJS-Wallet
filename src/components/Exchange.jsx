import { useContext } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AccountsContext } from "../contexts/accounts.jsx"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogClose, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog.jsx"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form.jsx"
import { Button } from "../ui/button.jsx"
import { Input } from "../ui/input.jsx"

function Exchange() {
    const { isBinding, isSimu } = useContext(AccountsContext)

    if (!isBinding || !isSimu) {
        const text = !isBinding ? "绑定PIJS账号" : "完成私募"
        return (
            <div
                className="flex flex-col mx-auto justify-center items-center mb-0 bg-[#1F2328] rounded-xl text-center p-4 py-7 gap-5">
                <DialogTitle className="text-white">{`请先${text}再兑换`}</DialogTitle>
                <DialogClose className="text-black w-1/2 h-12 rounded-lg bg-primary"> 知道了 </DialogClose>
            </div>
        )
    }

    function handleExchange() {
        // 处理兑换逻辑
    }

    const FormSchema = z.object({
        from: z.string().min(2, {
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

    return (
        <>
            <DialogHeader>
                <DialogTitle className="flex gap-2">
                    <img src="/assets/ArrowLeft.svg" alt="ArrowLeft" />
                    <span>JS账号兑换PIJS</span>
                </DialogTitle>
            </DialogHeader>
            <DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleExchange)}
                          className="space-y-6 mx-auto rounded-xl p-6 sm:p-10 w-2/3 bg-[#1F2328] relative">
                        <FormField
                            control={form.control}
                            name="from"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm/6 font-medium text-[#ABB1B9]">从</FormLabel>
                                    <FormControl>
                                        <Input value={0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="from"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className="text-sm/6 font-medium text-[#ABB1B9]">登录密码验证</FormLabel>
                                    <FormControl>
                                        <Input value={0} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        绑定后不可修改，请认真确认
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <Button className="bg-primary w-full h-12 rounded-lg text-center text-black" type="submit">
                            兑换
                        </Button>
                    </form>
                </Form>
            </DialogDescription>
        </>
    )
}

export default Exchange
