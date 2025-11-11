import type Modifier from "@/components/ui/modifier/modifier.tsx";
import type {ArrangementConfig} from "@/components/ui/ArrangementConfig.ts";
import type {AlignmentConfig} from "@/components/ui/AlignmentConfig.ts";
import {Arrangement} from "@/components/ui/Arrangement.ts";
import {Alignment} from "@/components/ui/Alignment.ts";
import {Layout} from "@/components/ui/layout/layout.tsx";
import React from "react";

interface RowProps {
    modifier?: Modifier,
    verticalArrangement?: ArrangementConfig,
    horizontalAlignment?: AlignmentConfig,
    children: React.ReactNode
}

export const Column = (
    {
        modifier,
        verticalArrangement = Arrangement.Top,
        horizontalAlignment = Alignment.Start,
        children,
    }: RowProps
) => {
    return (
        <Layout
            modifier={modifier}
            arrangementConfig={verticalArrangement}
            alignmentConfig={horizontalAlignment}
            isVertical={true}
        >
            {children}
        </Layout>
    )
}