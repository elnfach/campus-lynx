export default interface ArticleItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    author: {
        name: string;
        avatar: string;
    };
    date: string;
    readTime: string;
}