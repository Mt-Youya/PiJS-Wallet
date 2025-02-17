import { AccountsContext } from "../contexts/accounts.jsx"
import { useContext } from "react"
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog.jsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form.jsx"
import { Input } from "@/ui/input.jsx"
import { Button } from "@/ui/button.jsx"
import { useTranslation } from "react-i18next"
import { bindPijs } from "@/apis/auth.js"

function Binding() {
    const { isLogin, setIsLogin } = useContext(AccountsContext)
    const { t } = useTranslation()

    function handleBinding(data) {
        bindPijs(data).then(() => setIsLogin(true))
    }

    const FormSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
    })
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    return (

        <>
            <DialogHeader>
                <DialogTitle className="text-white flex gap-2 justify-start items-center">
                    <img src="/assets/ArrowLeft.svg" alt="ArrowLeft" />
                    <span className="text-primary">绑定PIJS账号</span>
                </DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleBinding)} className="mb-0">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel className="text-sm/6 font-medium text-[#ABB1B9] ">PIJSwap
                                        账号</FormLabel>
                                    <FormControl>
                                        <Input className="border-[#494E54] text-[#474B50]"
                                               placeholder="请输入 PIJSwap 账号" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="mt-5">
                                <FormLabel className="text-sm/6 font-medium text-[#ABB1B9] ">登录密码验证</FormLabel>
                                <FormControl>
                                    <Input className="border-[#494E54] text-[#474B50]"
                                           placeholder="请输入登录密码" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogDescription className="text-[#5D6167]">绑定后不可修改，请认真确认</DialogDescription>

                    <Button type="submit" className="mt-8 w-full h-12">{t("绑定")}</Button>
                </form>
            </Form>
        </>
    )
}

export default Binding
