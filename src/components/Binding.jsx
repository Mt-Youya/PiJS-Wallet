import { memo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog.jsx"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form.jsx"
import { Input } from "@/ui/input.jsx"
import { Button } from "@/ui/button.jsx"
import { bindPijs } from "@/apis/auth.js"
import { useToast } from "@/hooks/useToast.js"

function Binding() {
    const { t } = useTranslation()

    async function handleBinding(params) {
        const { success, data: { message } } = await bindPijs(params)
        useToast(message, success)
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
            <DialogHeader className="w-full">
                <DialogTitle className="flex gap-2 justify-start items-center">
                    <img src="/assets/ArrowLeft.svg" alt="ArrowLeft" />
                    <span className="text-primary">{t("绑定您的APP账号")}</span>
                </DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleBinding)} className="mb-0 w-full">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm/6 font-medium text-[#ABB1B9] ">
                                    {t("PIJS APP账号")}
                                </FormLabel>
                                <FormControl>
                                    <Input className="border-[#494E54] text-[#474B50] my-2" placeholder="请输入 PIJSwap 账号" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control} name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm/6 font-medium text-[#ABB1B9] ">登录密码验证</FormLabel>
                                <FormControl>
                                    <Input className="border-[#494E54] text-[#474B50] my-2" placeholder="请输入登录密码" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogDescription className="text-[#5D6167]">绑定后不可修改，请认真确认</DialogDescription>

                    <Button type="submit" className="mt-8 w-full h-12 text-black">{t("绑定")}</Button>
                </form>
            </Form>
        </>
    )
}

export default memo(Binding)
