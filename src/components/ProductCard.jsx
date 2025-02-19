import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog.jsx"
import { useTranslation } from "react-i18next"

function ProductCard({ title, dollar, description, footer, modalContent }) {
    const { t } = useTranslation()
    return (
        <>
            <section className="border-solid-grey bg-[#1F2328] px-3 pt-3 pb-1 text-[#ABB1B9] my-2 text-sm">
                <div className="*:flex *:items-center *:justify-between">
                    <div className="flex items-center justify-center ">
                        <span>{title}</span>
                        <span className="text-right">{description}</span>
                    </div>
                    <div className="my-2">
                        <span className="text-[#F4C134]">{dollar}</span>
                        <Dialog>
                            <DialogContent
                                className="max-w-md text-white border-none w-7/12 rounded-xl bg-white/5 p-6 backdrop-blur-2xl flex flex-col justify-start items-center"
                            >
                                {modalContent}
                            </DialogContent>
                            <DialogTrigger>
                                <a className="text-[#9C6BE5]">{t("即将开放")} {">>"} </a>
                            </DialogTrigger>
                        </Dialog>
                    </div>
                </div>
                {footer}
            </section>
        </>
    )
}

export default ProductCard
