import type {ButtonProps} from "@/components/buttons/interface/buttonProps.ts";
import {useTheme} from "@/hooks/useTheme.ts";

const Button = (
    {
        className = "",
        disabled = false,
        fullWidth = false,
        text,
        ...rest
    }: ButtonProps
) => {
    const { theme } = useTheme();

    const baseClasses = 'hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition duration-200';
    const buttonClasses = `
    ${baseClasses}
    ${theme.colors.primary} 
    ${theme.colors.onPrimary} 
    ${theme.shapes.medium}  
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
    `;

    return (
        <button
            className={buttonClasses}
            disabled={disabled}
            {...rest}
        >
            {text}
        </button>
    );
};

export default Button;