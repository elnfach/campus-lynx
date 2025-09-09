import type {ButtonHTMLAttributes} from "react";

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    onClick?: ()=> void;
}
