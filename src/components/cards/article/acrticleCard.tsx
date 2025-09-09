import type ArticleItem from "@/components/cards/article/articleItem.ts";
import {useTheme} from "@/hooks/useTheme.ts";

interface ArticleCardProps
{
    item: ArticleItem;
}

const ArticleCard = (
    {
        item
    }: ArticleCardProps
) => {

    const { theme } = useTheme();

    const containerStyle = `
        flex-shrink-0 w-80 h-90
        
        ${theme.colors.surfaceContainer}
        
        rounded-xl shadow-lg
        
        overflow-hidden hover:shadow-xl transition-all
        
        duration-300 hover:-translate-y-1
    `;

    const titleStyle = `
        text-xl font-bold
        ${theme.colors.onSurface}
    `;

    const tagStyles = `
        px-2 py-1 bg-university-primary
        text-xs
        font-semibold rounded-full
        ${theme.colors.onSecondaryContainer}
    `;

    const descriptionStyle = `
        mb-4 line-clamp-2
        ${theme.colors.onSecondaryContainer}
    `;

    return(
        <div key={item.id} className={containerStyle}>
            <div className="relative h-48 overflow-hidden">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
                <div className="absolute bottom-2 left-2 flex space-x-2">
                    {item.tags.map((tag, index) => (
                        <span
                            key={index}
                            className={tagStyles}
                        >
                                {tag}
                            </span>
                    ))}
                </div>
            </div>

            <div className="p-4">
                <h3 className={titleStyle}>{item.title}</h3>
                <p className={descriptionStyle}>{item.description}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img
                            src={item.author.avatar}
                            alt={item.author.name}
                            className="w-8 h-8 rounded-full object-cover"/>
                        <span className="text-sm font-medium text-gray-700">{item.author.name}</span>
                    </div>

                    <div className="text-xs text-gray-500">
                        <span>{item.date}</span>
                        <span className="mx-1">•</span>
                        <span>{item.readTime}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard;