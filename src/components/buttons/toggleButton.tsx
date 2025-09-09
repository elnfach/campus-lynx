import type {ToggleButtonProps} from "@/components/buttons/interface/toggleButtonProps.ts";
import {useState} from "react";
import {useTheme} from "@/hooks/useTheme.ts";

const ToggleButton = (
    {
        className = "",
        disabled = false,
        fullWidth = false,
        text,
        ...rest
    }: ToggleButtonProps
) => {
    const { theme } = useTheme();
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(!isOn);
    };

    const baseClasses = "font-bold rounded-md transition duration-200 focus:outline-none px-4 py-2 rounded-md";
    const state = isOn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700";
    const buttonClasses = `
        ${baseClasses}
        ${theme.colors.primary} 
        ${theme.colors.onPrimary}
        ${theme.shapes.medium}
        ${state}
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
            {text}
        </button>
    )
}

export default ToggleButton;