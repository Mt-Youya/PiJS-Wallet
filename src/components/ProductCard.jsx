import { Dialog, DialogContent } from "@/ui/dialog.jsx"
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
                            <DialogContent className="space-y-6 mx-auto rounded-xl p-6 sm:p-10 w-2/3 bg-[#1F2328]">
                                {modalContent}
                            </DialogContent>
                            <a className="text-[#9C6BE5]">{t("即将开放")} {">>"} </a>
                        </Dialog>
                    </div>
                </div>
                {footer}
            </section>
        </>
    )
}

export default ProductCard
