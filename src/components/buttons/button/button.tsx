import type {ButtonProps} from "@/components/buttons/interface/buttonProps.ts";
import {useTheme} from "@/hooks/useTheme.ts";

const Button = (
    {
        className = `
            ${useTheme().theme.colors.onPrimaryContainer}
        `,
        disabled = false,
        fullWidth = false,
        text,
        ...rest
    }: ButtonProps
) => {
    const { theme } = useTheme();

    const baseClasses = 'font-bold py-3 px-4 rounded-md transition duration-200';
    const buttonClasses = `
    ${baseClasses}
    ${theme.colors.onPrimaryContainer}
    ${theme.colors.primaryContainer}
    ${theme.shapes.small}
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