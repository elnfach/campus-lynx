import type {ToggleIconButtonProps} from "@/components/buttons/interface/toggleIconButtonProps.ts";
import {useState} from "react";
import {useTheme} from "@/hooks/useTheme.ts";

const ToggleIconButton= (
    {
        className = "",
        disabled = false,
        fullWidth = false,
        icon,
        ...rest
    }: ToggleIconButtonProps
) => {
    const { theme } = useTheme();
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(!isOn);
    };

    const baseClasses = "font-bold rounded-md focus:outline-none px-4 py-2 rounded-md";
    const buttonClasses = `
        ${baseClasses}
        ${theme.colors.surface} 
        ${theme.colors.onSurface}
        ${theme.shapes.medium}

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