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

            {visible ? (
                <EyeClosedIcon
                    size={20}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setVisible(false)}
                />
            ) : (
                <EyeIcon
                    size={20}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setVisible(true)}
                />
            )}
        </div>
    )
}

export default PasswordInput
