import Modifier from "@/components/ui/modifier/modifier.tsx";
import {Arrangement} from "@/components/ui/Arrangement.ts";
import {Alignment} from "@/components/ui/Alignment.ts";
import {Layout} from "@/components/ui/layout/layout.tsx";



const InnerLoader = (
    id: number,
    modifier: Modifier
) =>
{
    const inner_modifier = modifier ? modifier.build() : '';
    const styles = `
        rounded-full
        animate-bounce
        ${inner_modifier}
    `;
    return(
        <div
            key={id}
            className={styles}
            style={{ animationDelay: `${id * 0.1}s` }}
        />
    )
}

export const ModernLoader = () => {
    return (
        <Layout modifier={Modifier.new().fillMaxSize()}
                arrangementConfig={Arrangement.Center}
                alignmentConfig={Alignment.Center}
                isVertical={false}>
            {[...Array(3)].map((_, i) => (
                InnerLoader(i, Modifier.new().margin(4).width(16).height(16).backgroundColor('gray-600'))
            ))}
        </Layout>
    );
};