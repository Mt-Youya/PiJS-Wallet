import { useEffect, useRef, useState } from "react"
import { Input } from "@/ui/input.jsx"

function SplitInputCode({ onChange, length = 6 }) {
    const [code, setCode] = useState(Array(length).fill(""))

    function handleChange(e, index) {
        const value = e.target.value
        const newCode = [...code]
        newCode[index] = value.toUpperCase()

        const inputs = iptsRef.current

        if (value && index < length - 1) {
            inputs[index + 1].focus()
        }
        setCode(newCode)
    }

    function handleKeyDown(e, index) {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            return iptsRef.current[index - 1].focus()
        }
        if (e.key === "ArrowLeft") {
            return iptsRef.current[index && index - 1].focus()
        } else if (e.key === "ArrowRight") {
            return iptsRef.current[index < length - 1 && index + 1].focus()
        }

        if (!/^[a-zA-Z0-9]$/.test(e.key)) return
        if (code[index]) {
            const newCode = [...code]
            newCode[index] = e.key
            setCode(newCode)
        }
    }

    useEffect(() => {
        onChange?.(code.join(""))
    }, [code])

    const iptsRef = useRef([])
    return (
        <div className="flex space-x-2 justify-center">
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
