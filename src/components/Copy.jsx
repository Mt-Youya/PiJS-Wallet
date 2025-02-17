import { toast } from "sonner"

function Copy({ code }) {
    function handleCopy() {

        toast("复制成功!")
    }

    return (
        <>
            <img onClick={handleCopy} src="/assets/Copy.svg" alt="copy" />
        </>
    )
}

export default Copy
