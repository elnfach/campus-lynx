import type {JSX} from "react";

export class TextAlign
{
    static readonly Left = 'text-left';
    static readonly Center = 'text-center';
    static readonly Right = 'text-right';
    static readonly Justify = 'text-justify';
    static readonly Start = 'text-start';
    static readonly End = 'text-end';
}

export class TextOverflow
{
    static readonly Truncate = 'truncate';
    static readonly Ellipsis = 'text-ellipsis';
    static readonly Clip = 'text-clip';
}

export class TextDecoration
{
    static readonly None = 'no-underline';
    static readonly Underline = 'underline';
    static readonly Overline = 'overline';
    static readonly LineThrough = 'line-through';
}

export class FontWeight
{
    static readonly Normal = 'font-normal';
    static readonly Thin = 'font-extralight';
    static readonly Extralight = 'font-extralight';
    static readonly Light = 'font-light';
    static readonly Medium = 'font-medium';
    static readonly Semibold = 'font-semibold';
    static readonly Bold = 'font-bold';
    static readonly Extrabold = 'font-extrabold';
    static readonly Black = 'font-black';

    static value(weight: number)
    {
        if((weight >= 0) && (weight <= 1000))
            return `font-[${weight}]`
        console.error(`Font weight can be in range [1, 1000]. Current value: ${weight}`)
    }
}

export class FontSize
{
    static readonly XS = 'font-xs';
    static readonly SM = 'font-sm';
    static readonly Base = 'font-base';
    static readonly LG = 'font-lg';
    static readonly XL = 'font-xl';
    static readonly _2XL = 'font-2xl';
    static readonly _3xL = 'font-3xl';
    static readonly _4xL = 'font-4xl';
    static readonly _5xL = 'font-5xl';
    static readonly _6xL = 'font-6xl';
    static readonly _7xL = 'font-7xl';
    static readonly _8xL = 'font-8xl';
    static readonly _9xL = 'font-9xl';

    static value(size: number)
    {
        return `text-[${size}]`
    }
}

export class FontStyle
{
    static readonly Normal = 'not-italic';
    static readonly Italic = 'italic';
}

export class LetterSpacing
{
    static readonly Tighter = 'tracking-tighter';
    static readonly Tight = 'tracking-tight';
    static readonly Normal = 'tracking-normal';
    static readonly Wide = 'tracking-wide';
    static readonly Wider = 'tracking-wider';
    static readonly Widest = 'tracking-widest';

    static value(spacing: number)
    {
        return `tracking-[${spacing}]`
    }
}

interface TextProps {
    text: string | JSX.Element,
    className?: string,
    fontSize?: FontSize,
    fontStyle?: FontStyle,
    fontWeight?: FontWeight,
    letterSpacing?: LetterSpacing,
    textAlign?: TextAlign,
    textOverflow?: TextOverflow,
    textDecoration?: TextDecoration,
}

const Text = (
    {
        text,
        className,
        fontSize = FontSize.Base,
        fontStyle = FontStyle.Normal,
        fontWeight = FontWeight.Normal,
        letterSpacing = LetterSpacing.Normal,
        textAlign = TextAlign.Left,
        textOverflow = TextOverflow.Clip,
        textDecoration = TextDecoration.None,

    }: TextProps
) => {
    const style = `
        ${className}
        ${fontSize}
        ${fontStyle}
        ${fontWeight}
        
        ${letterSpacing}
        
        ${textAlign}
        ${textOverflow}
        ${textDecoration}
    `;

    return (
        <p
            className={style}
        >
            {text}
        </p>
    )
}

export default Text;