import { useEffect, useRef, useState } from "react"
import { Input } from "@/ui/input.jsx"

function SplitInputCode({ comInCode = "", onChange, length = 6 }) {
    const [code, setCode] = useState(comInCode?.split("") ?? Array(length).fill(""))

    useEffect(() => {
        if (!code || !Array.isArray(code) || code.length < 6) {
            setCode(Array(6).fill(""))
        }
    }, [code])

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
        if (e.key === "Backspace" || e.key === "Delete") {
            const newCode = [...code]
            newCode[index] = ""
            setCode(newCode)
            if (code[index]) {
                return
            }
            return iptsRef.current[index - 1].focus()
        }
        if (e.key === "ArrowLeft") {
            return iptsRef.current[index && index - 1].focus()
        } else if (e.key === "ArrowRight") {
            return iptsRef.current[index < length - 1 && index + 1].focus()
        }

        if (!/^[a-zA-Z0-9]$/.test(e.key)) {
            return e.preventDefault()
        }
    }

    function handlePaste(event) {
        const value = event.target.value
        if (!value) event.preventDefault()
        const paste = (event.clipboardData || window.clipboardData).getData("text")
        const reg = /[a-zA-Z0-9]/g
        const str = paste.match(reg).slice(0, 6)
        const diff = 6 - str.length
        if (diff > 0) {
            new Array(diff).fill("").forEach(s => str.push(s))
        }
        setCode(str)
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
                        value={digit.toUpperCase()}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={e => handlePaste(e)}
                        className="w-12 h-12 text-xl text-center text-white border-solid-grey outline-0 focus:ring-blue-500"
                    />
                ))}
            </div>
        </div>
    )
}

export default SplitInputCode
