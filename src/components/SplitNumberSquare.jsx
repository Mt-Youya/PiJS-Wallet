import { clsx } from "clsx"

function SplitNumberSquare({ code, size = "large" }) {
    const len = code?.toString().length || 1

    return (
        <ul className={clsx(`w-fit ml-auto grid grid-cols-${len} `, size === "large" ? `*:p-3 gap-2` : `*:p-1 gap-1`)}
            style={{ gridTemplateColumns: `repeat(${len}, 1fr)` }}>
            {code?.toString().split("").map((str, index) => (
                <li
                    className={clsx(`text-center p-1 bg-[#1F2328] border-solid-grey`, size === "small" ? "w-8 h-8" : "w-12 h-12")}
                    key={index}
                >
                    {str.toUpperCase()}
                </li>
            ))}
        </ul>
    )
}

export default SplitNumberSquare
