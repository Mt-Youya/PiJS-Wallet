import { Button } from "@headlessui/react"
import { useTranslation } from "react-i18next"

function Card({ title, dollar, description, footer, onClick }) {
    const { t } = useTranslation()
    return (
        <section className="border-solid-grey bg-[#1F2328] px-3 pt-3 pb-1 text-[#ABB1B9] my-2 text-sm">
            <div className="*:flex *:items-center *:justify-between">
                <div className="flex items-center justify-center ">
                    <span>{title}</span>
                    <span className="text-right">{description}</span>
                </div>
                <div className="my-2">
                    <span className="text-[#F4C134]">{dollar}</span>
                    <Button onClick={onClick}>
                        <a className="text-[#9C6BE5]">{t("即将开放")} {">>"} </a>
                    </Button>
                </div>
            </div>
            {footer}
        </section>
    )
}

export default Card
