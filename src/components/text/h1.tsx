import type BaseTextProps from "@/components/text/interface/baseTextProps.ts";
import {useTheme} from "@/hooks/useTheme.ts";

const H1 = (
    props: BaseTextProps
) => {
    const { theme } = useTheme();

    const {
        children,
        color = `${theme.colors.onBackground}`,
        onHover,
        fontSize,
        fontStyle,
        fontWeight,
        align,
        underline,
        lineThrough,
        overflow,
        className,
        onClick
    } = props;

    const baseClasses = "font-bold rounded-md focus:outline-none px-4 py-2 rounded-md";
    const buttonClasses = `
        ${baseClasses}
        ${theme.typography.h1}
        ${color}
        ${onHover}
        ${fontSize}
        ${fontWeight}
        ${align}
        ${fontStyle}
        ${underline}
        ${lineThrough}
        ${overflow}
        ${className}
    `;

    return (
        <p
            className={buttonClasses}
            onClick={onClick}
        >
            {children}
        </p>
    )
}

export default H1;