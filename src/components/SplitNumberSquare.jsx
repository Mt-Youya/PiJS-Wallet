function SplitNumberSquare({ number }) {
    const len = number?.toString().length || 1;
    return (
        <ul className={`w-fit ml-auto grid grid-cols-${len} gap-2 *:p-3 `}
            style={{ gridTemplateColumns: `repeat(${len}, 1fr)` }}>
            {number.toString().split("").map((num, index) => (
                <li key={index} className="w-12 h-12 text-center bg-[#1F2328] border-solid-grey"> {num} </li>
            ))}
        </ul>
    )
}

export default SplitNumberSquare
