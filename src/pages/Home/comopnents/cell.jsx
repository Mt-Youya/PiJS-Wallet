import SplitNumberSquare from "@/components/SplitNumberSquare.jsx";

function Cell() {
    const sellRate = (123 / 3000 * 100).toFixed(2)
    return (
        <>
            <div className="rounded-xl bg-[#181A20] border-solid-grey text-white mt-4 mb-1">
                <div className="p-3">
                    <SplitNumberSquare number={3000}/>
                    <span className="text-white text-right block mt-3">已售卖</span>
                </div>
                <div className='rounded-full w-full h-2 bg-[#2A2C30] overflow-hidden'>
                    <p className={`bg-primary h-full w-[calc(${sellRate}%)] rounded-full`}
                       style={{ width: `calc(${sellRate}% )` }}/>
                </div>
            </div>
            <div className="flex justify-between text-white *:text-[#ABB1B9]">
                <span>总分数 3000</span>
                <span>82 未售出</span>
            </div>
        </>
    )
}

export default Cell
