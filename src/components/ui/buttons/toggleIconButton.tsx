import type {ToggleIconButtonProps} from "@/components/ui/buttons/interface/toggleIconButtonProps.ts";
import {useState} from "react";

const ToggleIconButton= (
    {
        className = "",
        disabled = false,
        fullWidth = false,
        icon,
        ...rest
    }: ToggleIconButtonProps
) => {
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(!isOn);
    };

    const baseClasses = "font-bold rounded-md focus:outline-none px-4 py-2 rounded-md";
    const buttonClasses = `
        ${baseClasses}

        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
    `;

    return (
        <button
            onClick={toggle}
            className={buttonClasses}
            disabled={disabled}
            {...rest}
        >
            {icon}
        </button>
    )
}

export default ToggleIconButton;