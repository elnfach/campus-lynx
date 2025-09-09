import {useTheme} from "@/hooks/useTheme.ts";
import type {IconButtonProps} from "@/components/buttons/interface/iconButtonProps.ts";

const FilledIconButton = (
    {
        className = "",
        disabled = false,
        fullWidth = false,
        icon,
        ...rest
    }: IconButtonProps
) => {
    const { isDark } = useTheme();

    const baseClasses = 'font-bold rounded-md transition duration-200 focus:outline-none p-2 rounded-full hover:bg-gray-300 ';
    const theme = isDark ? 'bg-gray-200 text-gray-700' : 'bg-gray-700 text-gray-200';
    const buttonClasses = `
    ${baseClasses}
    ${theme}
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
            {icon}
        </button>
    );
};
export default FilledIconButton;