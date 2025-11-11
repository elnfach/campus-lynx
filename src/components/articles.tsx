import Carousel from "@/components/ui/carousel/carousel.tsx";
import ArticleCard from "@/components/ui/cards/article/acrticleCard.tsx";
import {newsItems} from "@/config/common.tsx";
import Text, {TextAlign} from "@/components/ui/text/text.tsx";
import Modifier from "@/components/ui/modifier/modifier.tsx";

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
            <Text text={"Новости нашего университета"}
                  textAlign={TextAlign.Left}
                  modifier={Modifier.new().margin(0,0,0,8)}
            />
            <Carousel items={newsItems} Card={ArticleCard}/>
        </div>
    )
}