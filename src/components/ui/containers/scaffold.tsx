import React from "react";

export interface ScaffoldProps
{
    header?: React.ReactNode,
    footer?:  React.ReactNode,
    snacks?:  React.ReactNode,
    fab?: React.ReactNode,
    fabPosition?: string,
    containerColor: string,
    contentColor: string,
    children: React.ReactNode,
}

const Scaffold = (
    {
        header,
        footer,
        snacks,
        fab,
        //fabPosition,
        //containerColor,
        //contentColor,
        children,
    }: ScaffoldProps
) => {
    //const { theme } = useTheme();

    return (
        <>
            {header}
            {snacks}
            {children}
            {fab}
            {footer}
        </>
    )
}

export default Scaffold;