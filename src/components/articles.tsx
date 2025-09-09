import Carousel from "@/components/carousel/carousel.tsx";
import ArticleCard from "@/components/cards/article/acrticleCard.tsx";
import {newsItems} from "@/config/common.ts";
import H1 from "./text/h1";

export default function Articles()
{
    //const {theme} = useTheme();

    const surfaceStyle = `
        relative 
        px-4 
        py-8
    `

    return (
        <div className={surfaceStyle}>
            <H1 className="text-left text-university-primary mb-8">Новости нашего университета</H1>
            <Carousel items={newsItems} Card={ArticleCard}/>
        </div>
    )
}