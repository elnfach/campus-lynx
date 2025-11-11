import type Modifier from "@/components/ui/modifier/modifier.tsx";
import type {ArrangementConfig} from "@/components/ui/ArrangementConfig.ts";
import type {AlignmentConfig} from "@/components/ui/AlignmentConfig.ts";
import {Arrangement} from "@/components/ui/Arrangement.ts";
import {Alignment} from "@/components/ui/Alignment.ts";
import React from "react";

interface LayoutProps
{
    modifier?: Modifier,
    arrangementConfig: ArrangementConfig,
    alignmentConfig: AlignmentConfig,
    isVertical: boolean,
    children?: React.ReactNode,
}

export const Layout = (
    {
        modifier,
        arrangementConfig,
        alignmentConfig,
        isVertical = false,
        children
    }: LayoutProps
) => {
    const config = modifier ? modifier.build() : '';
    const arrangement = Arrangement.applyToElement(arrangementConfig, isVertical);
    const alignment = Alignment.applyToElement(alignmentConfig, isVertical);

    const styles = `
        ${config}
        ${arrangement}
        ${alignment}
    `;

    return (
        <div className={styles}>
            {children}
        </div>
    )
}