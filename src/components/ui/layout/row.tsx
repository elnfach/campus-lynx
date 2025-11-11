import type Modifier from "@/components/ui/modifier/modifier.tsx";
import {Layout} from "@/components/ui/layout/layout.tsx";
import type {ArrangementConfig} from "@/components/ui/ArrangementConfig.ts";
import type {AlignmentConfig} from "@/components/ui/AlignmentConfig.ts";
import {Arrangement} from "@/components/ui/Arrangement.ts";
import {Alignment} from "@/components/ui/Alignment.ts";
import React from "react";

interface RowProps {
    modifier?: Modifier,
    horizontalArrangement?: ArrangementConfig,
    verticalAlignment?: AlignmentConfig,
    children: React.ReactNode
}

export const Row = (
    {
        modifier,
        horizontalArrangement = Arrangement.Start,
        verticalAlignment = Alignment.Top,
        children,
    }: RowProps
) => {
    return (
        <Layout
            modifier={modifier}
            arrangementConfig={horizontalArrangement}
            alignmentConfig={verticalAlignment}
            isVertical={false}
        >
            {children}
        </Layout>
    )
}