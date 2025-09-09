import type {ButtonProps} from "@/components/buttons/interface/buttonProps.ts";
import {useTheme} from "@/hooks/useTheme.ts";

export const themes = {
    space: {
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
    },
};

const Button = (
    {
        className = '',
        disabled = false,
        fullWidth = false,
        text,
        ...rest
    }: ButtonProps
) => {
    const { theme } = useTheme();

    const baseClasses = `font-bold py-3 px-4 rounded-md transition duration-200`;
    const baseStyles = ` 
        ${theme.colors.onPrimaryContainer}
        ${theme.colors.primaryContainer}
        ${theme.shapes.small}
    `;

    const styles = (className?.length < 1) ? baseStyles : className;

    const buttonClasses = `
    ${baseClasses}
    ${styles}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
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