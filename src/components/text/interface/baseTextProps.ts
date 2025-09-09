import type {ButtonHTMLAttributes, ReactNode} from "react";

/*export enum FontSize {
    XS = 'text-xs',
    SM = 'text-sm',
    BASE = 'text-base',
    LG = 'text-lg',
    XL = 'text-xl',
    XXL = 'text-2xl',
    XXXL = 'text-3xl',
    XXXXL = 'text-4xl',
    XXXXXL = 'text-5xl'
}

export enum FontWeight {
    LIGHT = 'font-light',
    NORMAL = 'font-normal',
    MEDIUM = 'font-medium',
    SEMIBOLD = 'font-semibold',
    BOLD = 'font-bold'
}

export enum TextAlign {
    LEFT = 'text-left',
    CENTER = 'text-center',
    RIGHT = 'text-right',
    JUSTIFY = 'text-justify'
}

export enum FontStyle {
    NORMAL = '',
    ITALIC = 'italic'
}

export enum TextOverflow {
    TRUNCATE = 'truncate',
    ELLIPSIS = 'text-ellipsis overflow-hidden',
    CLIP = 'text-clip overflow-hidden'
}*/

export default interface BaseTextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    color?: string;
    onHover?: string;
    fontSize?: string;
    fontWeight?: string;
    align?: string;
    fontStyle?: string;
    underline?: boolean;
    lineThrough?: boolean;
    overflow?: string;
    className?: string;
    onClick?: () => void;
}