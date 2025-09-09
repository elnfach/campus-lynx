import React from "react";
import {useNavigate} from "react-router-dom";

interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
    scrollOptions?: ScrollIntoViewOptions;
}

export const SmartLink = (
    {
        to,
        children,
        onClick,
        scrollOptions = { behavior: 'smooth', block: 'start' },
        ...props
    }: SmartLinkProps
) => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (onClick) {
            onClick(e);
        }

        if (to.startsWith('#')) {
            const id = to.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView(scrollOptions);
            }
            return;
        }

        if (to.startsWith('/')) {
            navigate(to);
            return;
        }

        window.location.href = to;
    };

    const isExternal = !to.startsWith('#') &&
        !to.startsWith('/') &&
        !to.startsWith('./') &&
        !to.startsWith('../');

    return (
        <a
            href={to}
            onClick={isExternal ? undefined : handleClick}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            {...props}
        >
            {children}
        </a>
    );
}