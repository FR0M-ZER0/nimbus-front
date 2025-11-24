import { useState } from "react"
import { CheckIcon } from "@phosphor-icons/react"

function Checkbox({ label, defaultChecked = false, onToggle }) {
    const [checked, setChecked] = useState(defaultChecked)

    const handleChange = () => {
        const newValue = !checked
        setChecked(newValue)
        onToggle?.(newValue)
    }

    return (
        <div className="flex items-center relative group">
            <input
                id={`checkbox-${label}`}
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={handleChange}
            />

            <div
                onClick={handleChange}
                className={`h-6 w-6 rounded-md transition flex items-center justify-center
                    ${checked ? "bg-[#292988]" : "bg-[#262730]"} cursor-pointer`}
            >
                {checked && <CheckIcon size={14} className="text-white" />}
            </div>

            <label
                htmlFor={`checkbox-${label}`}
                className="cursor-pointer px-3 py-1 select-none"
            >
                {label}
            </label>
        </div>
    )
}

export default Checkbox
