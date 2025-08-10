import {useTheme} from "@/hooks/useTheme.ts";
import H3 from "@/components/text/h3.tsx";
import Carousel from "@/components/carousel/carousel.tsx";
import ArticleCard from "@/components/cards/article/acrticleCard.tsx";
import {newsItems} from "@/config/common.ts";

export default function Articles()
{
    const {theme} = useTheme();

    const surfaceStyle = `
        relative 
        px-4 
        py-8
        ${theme.colors.background}
    `

    return (
        <div className={surfaceStyle}>
            <H3 className="text-center text-university-primary mb-8">Новости</H3>
            <Carousel items={newsItems} Card={ArticleCard}/>
        </div>
    )
}