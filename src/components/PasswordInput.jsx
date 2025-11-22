import { useState } from "react"
import { EyeIcon, EyeClosedIcon } from "@phosphor-icons/react"

function PasswordInput({ ...props }) {
    const [visible, setVisible] = useState(false)

    return (
        <div className="relative">
            <input
                type={visible ? "text" : "password"}
                className="form-input pr-10"
                {...props}
            />

            <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <button
                    className="alt-dark-color-3-bg text-white py-3.5 px-6 rounded-r-[10px]"
                    onClick={() => setVisible(!visible)}
                    type="button"
                >
                    {visible ? <EyeClosedIcon size={20} /> : <EyeIcon size={20} />}
                </button>
            </div>
        </div>
    )
}

export default PasswordInput
