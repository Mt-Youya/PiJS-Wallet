import { useContext } from "react"
import { clsx } from "clsx"
import { Button, Description, Dialog, DialogPanel, DialogTitle, Field, Fieldset, Input, Label } from "@headlessui/react"
import { AccountsContext } from "../contexts/accounts.jsx"

function Exchange({ open, setOpen }) {
    const { isBinding, isSimu } = useContext(AccountsContext)

    if (!isBinding || !isSimu) {
        const text = !isBinding ? "绑定PIJS账号" : "完成私募"
        return (
            <Dialog open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} as="div"
                    className="relative z-10 focus:outline-none">
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#000000e0] backdrop-saturate-20">
                    <div className="flex flex-col min-h-full items-center justify-center p-4 text-white">
                        <DialogPanel transition
                                     className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                            <div
                                className="flex flex-col mx-auto justify-center items-center w-2/3 bg-[#1F2328] rounded-xl text-center p-4 py-7 gap-5">

                                <DialogTitle>{`请先${text}再兑换`}</DialogTitle>
                                <Button className="text-black w-1/2 h-12 rounded-lg bg-primary"
                                        onClick={() => setOpen(false)}>知道了</Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        )
    }

    function handleExchange() {
        // 处理兑换逻辑
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} as="div"
                className="relative z-10 focus:outline-none">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[#000000e0] backdrop-saturate-20">
                <div className="flex flex-col min-h-full items-center justify-center p-4 text-primary">

                    <DialogPanel transition
                                 className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                        <Fieldset className="space-y-6 m-auto rounded-xl p-6 sm:p-10 w-2/3 bg-[#1F2328] relative">
                            <img
                                className="absolute w-5 aspect-square top-3 right-3 border-1 border-solid border-white rounded-full cursor-pointer"
                                src="/assets/Close.svg" alt="Close" onClick={() => setOpen(false)} />

                            <DialogTitle className="flex gap-2 items-center">
                                <img src="/assets/ArrowLeft.svg" alt="ArrowLeft" />
                                <span>JS账号兑换PIJS</span>
                            </DialogTitle>

                            <Field>
                                <Label className="text-sm font-medium text-[#ABB1B9]">从</Label>
                                <div className="flex items-center mt-3 space-x-2 rounded-lg bg-white/5 px-3">
                                    <div className="text-sm text-[#ABB1B9] flex gap-1 justify-center items-center">
                                        <span className="bg-[#D8D8D8] w-6 h-6 block rounded-full" /> JS
                                    </div>
                                    <Input
                                        className={clsx(
                                            "block w-full h-12 rounded-lg text-[#ABB1B9] text-sm text-right",
                                            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                        )}
                                        value="0"
                                    />
                                </div>
                            </Field>

                            <Description className="flex justify-center gap-1 text-[#ABB1B9] text-sm items-center mb-0">
                                <img
                                    className="block border-solid border-1 rounded-lg border-transparent bg-[#494E54] w-6 aspect-square p-1"
                                    src="/assets/ArrowDown.svg" alt="arrow-down" /> <span>1PiJS = 100Points</span>
                            </Description>
                            <Field>
                                <Label className="text-sm font-medium text-[#ABB1B9]">到</Label>
                                <div className="flex items-center mt-3 space-x-2 rounded-lg bg-white/5 px-3">
                                    <div className="text-sm text-[#ABB1B9] flex gap-1 justify-center items-center">
                                        <span className="bg-[#D8D8D8] w-6 h-6 block rounded-full" /> PIJS
                                    </div>
                                    <Input
                                        className={clsx(
                                            "block w-full h-12 rounded-lg text-[#ABB1B9] text-sm text-right",
                                            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                        )}
                                        value="0"
                                    />
                                </div>
                            </Field>


                            <Button className="bg-primary w-full h-12 rounded-lg text-center text-black mt-6"
                                    onClick={handleExchange}>
                                兑换
                            </Button>
                        </Fieldset>
                    </DialogPanel>

                </div>
            </div>
        </Dialog>
    )
}

export default Exchange
