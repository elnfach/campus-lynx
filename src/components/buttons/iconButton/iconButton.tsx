import type {IconButtonProps} from "@/components/buttons/interface/iconButtonProps.ts";

const IconButton = (
    {
        className = "",
        disabled = false,
        fullWidth = false,
        icon,
        ...rest
    }: IconButtonProps
) => {
    //const { isDark } = useTheme();

    const baseClasses = 'font-bold rounded-md transition duration-200 focus:outline-none p-2 rounded-full';

    const buttonClasses = `
    ${baseClasses}

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
export default IconButton;