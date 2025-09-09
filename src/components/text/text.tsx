import type BaseTextProps from "@/components/text/interface/baseTextProps.ts";

import React from "react";
import {useTheme} from "@/hooks/useTheme.ts";

const Text: React.FC<BaseTextProps> = (props) => {
    const { theme } = useTheme();

    const {
        children,
        className = '',
        fontSize = 'text-base',
        fontWeight = 'font-normal',
        align = 'text-left',
        fontStyle = '',
        underline = false,
        lineThrough = false,
        overflow = `${theme.colors.onSurface}`,
        onClick,
    } = props;

    const baseClasses = "font-bold rounded-md transition duration-200 focus:outline-none px-4 py-2 rounded-md";
    const buttonClasses = `
        ${baseClasses}
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

export default Text;