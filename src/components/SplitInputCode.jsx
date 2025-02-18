import { useRef, useState } from "react"
import { Input } from "@/ui/input.jsx"

function SplitInputCode({ onChange }) {
    const [code, setCode] = useState(Array(6).fill(""))

    function handleChange(e, index) {
        const value = e.target.value
        const newCode = [...code]
        newCode[index] = value

        const inputs = iptsRef.current

        if (value && index < 5) {
            inputs[index + 1].focus()
        }
        setCode(newCode)
        onChange?.(newCode.join())
    }

    function handleKeyDown(e, index) {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            iptsRef.current[index - 1].focus()
        }
    }

    const iptsRef = useRef([])
    return (
        <div className="flex space-x-2">
            <div className="flex space-x-2">
                {code.map((digit, index) => (
                    <Input
                        key={index}
                        ref={e => iptsRef.current[index] = e}
                        id={`input-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-12 text-xl text-center text-white border-solid-grey outline-0 focus:ring-blue-500"
                    />
                ))}
            </div>
        </div>
    )
}

export default SplitInputCode
