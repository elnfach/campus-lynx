import type Modifier from "@/components/ui/modifier/modifier.tsx";
import {Arrangement} from "@/components/ui/Arrangement.ts";
import {Alignment} from "@/components/ui/Alignment.ts";
import {Layout} from "@/components/ui/layout/layout.tsx";

interface SpacerProps {
    modifier?: Modifier,
}

export const Spacer = (
    {
        modifier,
    }: SpacerProps
) => {
    return (
        <Layout
            modifier={modifier}
            arrangementConfig={Arrangement.Start}
            alignmentConfig={Alignment.Top}
            isVertical={false}
        >
        </Layout>
    )
}