import { Button, Description, Dialog, DialogPanel, DialogTitle, Field, Fieldset, Input, Label } from "@headlessui/react"
import { clsx } from "clsx"
import { AccountsContext } from "../contexts/accounts.jsx"
import { useContext } from "react"

function Binding({ open, setOpen }) {
    const { isLogin, setIsLogin } = useContext(AccountsContext)

    function handleBinding() {
        setIsLogin(true)
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} as="div"
                className="relative z-10 focus:outline-none">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#000000e0] backdrop-saturate-20">
                <div className="flex flex-col min-h-full items-center justify-center p-4 text-primary">
                    <DialogPanel transition
                                 className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                        <Fieldset className="space-y-6 mx-auto rounded-xl p-6 sm:p-10 w-2/3 bg-[#1F2328] relative">
                            <img
                                className="absolute w-5 aspect-square top-3 right-3 border-1 border-solid border-white rounded-full"
                                src="/assets/Close.svg" alt="Close" onClick={() => setOpen(false)} />
                            <DialogTitle className="flex gap-2">
                                <img src="/assets/ArrowLeft.svg" alt="ArrowLeft" />
                                <span>绑定PIJS账号</span>
                            </DialogTitle>
                            <Field>
                                <Label className="text-sm/6 font-medium text-[#ABB1B9]">PIJSwap 账号</Label>
                                <Input
                                    className={clsx(
                                        "mt-3 block w-full h-12 rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-[#ABB1B9]",
                                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                    )}
                                    placeholder="请输入 PIJSwap 账号"
                                />
                            </Field>
                            <Field>
                                <Label className="text-sm/6 font-medium text-[#ABB1B9]">登录密码验证</Label>
                                <Input
                                    className={clsx(
                                        "mt-3 block w-full h-12 rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-[#ABB1B9]",
                                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                    )}
                                    placeholder="请输入登录密码"
                                />
                                <Description className="text-sm/6 text-white/50 mt-1">
                                    绑定后不可修改，请认真确认
                                </Description>
                            </Field>
                            <Button className="bg-primary w-full h-12 rounded-lg text-center text-black"
                                    onClick={handleBinding}>绑定</Button>
                        </Fieldset>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default Binding
