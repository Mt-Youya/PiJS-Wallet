import { memo, useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogHeader, DialogTitle } from "../ui/dialog.jsx"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form.jsx"
import { Button } from "../ui/button.jsx"
import { Input } from "../ui/input.jsx"
import { exchange, exchangeConfig } from "@/apis/auth.js"
import { useToast } from "@/hooks/useToast.js"

function Exchange() {
    const { t } = useTranslation()
    const [exchangeOptions, setExchangeOptions] = useState(null)

    async function handleExchange(params) {
        const { success, data: { message } } = await exchange(params)
        useToast(message, success)
    }

    const FormSchema = z.object({
        from: z.string().min(1, {
            message: "Username must be at least 1 characters.",
        }),
        to: z.string().min(1, {
            message: "Username must be at least 1 characters.",
        }),
    })
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            from: 0,
            to: 0,
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
                    <span>{t("JS兑换PIJS")}</span>
                </DialogTitle>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleExchange)} className="w-full rounded-xl p-2">
                    <FormField
                        control={form.control} name="from"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm/6 font-medium text-[#ABB1B9] flex justify-between mb-0">
                                    <span>{t("从")} </span>
                                    <span>{t("余额")}： <b className="text-primary">{exchangeOptions?.points}JS</b> </span>
                                </FormLabel>
                                <div className="rounded-xl flex justify-between relative">
                                    <div className="rounded-xl bg-[#292D33] p-1 flex gap-2 absolute top-1 left-1 text-[#ABB1B9]">
                                        <img src="/assets/Exchange.svg" alt="Exchange" /> JS
                                    </div>
                                    <FormControl>
                                        <Input type="number" className="outline-[#494E54] border-[#494E54] text-right py-3" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage className="text-white" />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center items-center mt-4">
                        <div className="bg-[#494E54] rounded-xl p-1 scale-75"><ArrowDown /></div>
                        {exchangeOptions?.points}PiJS = {exchangeOptions?.pijspoints}JS
                    </div>
                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm/6 font-medium text-[#ABB1B9]">{t("到")}</FormLabel>
                                <div className="rounded-xl flex justify-between relative">
                                    <div className="rounded-xl bg-[#292D33] p-1 flex gap-2 absolute top-1 left-1 text-[#ABB1B9]">
                                        <img src="/assets/Exchange.svg" alt="Exchange" /> PIJS
                                    </div>
                                    <FormControl>
                                        <Input type="number" className="outline-[#494E54] border-[#494E54] text-right py-3" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage className="text-white" />
                                <FormDescription className="text-[#5D6167]"> 绑定后不可修改，请认真确认 </FormDescription>
                            </FormItem>
                        )}
                    />

                    <Button className="bg-primary mt-10 w-full h-12 rounded-lg text-center text-black" type="submit"> {t("兑换")} </Button>
                </form>
            </Form>
        </>
    )
}

export default memo(Exchange)
