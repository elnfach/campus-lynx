import React from "react";

type InternalButtonType = 'button' | 'submit' | 'reset' | undefined

export class ButtonType
{
    static readonly Button: InternalButtonType = 'button';
    static readonly Submit: InternalButtonType = 'submit';
    static readonly Reset: InternalButtonType = 'reset';
}

function match(type: ButtonType | undefined): InternalButtonType {
    switch (type) {
        case ButtonType.Button:
            return 'button';
        case ButtonType.Submit:
            return 'submit'
        case ButtonType.Reset:
            return 'reset'
    }
    return undefined
}

interface ButtonProps
{
    onClick: () => void,
    className?: string,
    enabled?: boolean,
    type?: ButtonType,
    children: React.ReactNode,
}

const Button = (
    {
        onClick,
        className = "primary-button",
        enabled = true,
        type = ButtonType.Button,
        children,
    }: ButtonProps
) => {
    const checked_type = match(type);

    return (
        <button
            onClick={onClick}
            className={className}
            disabled={!enabled}
            type={checked_type}
        >
            {children}
        </button>
    );
};

export default Button;