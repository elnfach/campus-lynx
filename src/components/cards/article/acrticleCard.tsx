import type ArticleItem from "@/components/cards/article/articleItem.ts";

interface ArticleCardProps
{
    item: ArticleItem;
}

const ArticleCard = (
    {
        item
    }: ArticleCardProps
) => {
    return(
        <>
            <div key={item.id}
                 className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
                    <div className="absolute bottom-2 left-2 flex space-x-2">
                        {item.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-university-primary text-white text-xs font-semibold rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>

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
        </>
    )
}

export default ArticleCard;