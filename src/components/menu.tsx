import {useState} from "react";

type Category = {
    id: number;
    name: string;
    content: string;
};

export default function Menu() {

    const categories: Category[] = [
        { id: 1, name: 'Категория 1', content: 'Контент для категории 1' },
        { id: 2, name: 'Категория 2', content: 'Контент для категории 2' },
        { id: 3, name: 'Категория 3', content: 'Контент для категории 3' },
        { id: 4, name: 'Категория 4', content: 'Контент для категории 4' },
    ];

    const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);

    return (
        <div className="overflow-y-auto">
            <div className="container mx-auto px-6 py-4">
                <div className="flex h-screen p-4 gap-4">
                    {/* Левая панель - список категорий */}
                    <div className="w-1/6 rounded-lg p-4">
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    className={`p-2 rounded-md cursor-pointer transition-colors ${
                                        selectedCategory.id === category.id
                                            ? 'bg-blue-500 text-white'
                                            : 'hover:bg-gray-200'
                                    }`}
                                    onMouseEnter={() => setSelectedCategory(category)}
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Центральный контент */}
                    <div className="flex-1 bg-white rounded-lg p-6">
                        <h2 className="">{selectedCategory.name}</h2>
                        <p>{selectedCategory.content}</p>
                    </div>

                    {/* Правая панель - контактная информация */}
                    <div className="w-1/4">
                        <div className="">
                            <h3 className="font-bold text-xl mb-6">Приёмная комиссия</h3>

                            <div className="space-y-5">
                                <div>
                                    <p className="text-blue-100 text-sm mb-1">Телефоны:</p>
                                    <p className="font-medium">+7 495 800-10-01</p>
                                    <p className="font-medium">+7 800 100-00-11</p>
                                </div>

                                <div className="pt-2 border-t border-blue-400">
                                    <p className="text-blue-100 text-sm mb-1">Для студентов:</p>
                                    <p className="font-medium">+7 800 350-00-60</p>
                                </div>

                                <div className="pt-2 border-t border-blue-400">
                                    <p className="text-blue-100 text-sm mb-2">График работы:</p>
                                    <div className="space-y-1">
                                        <p className="flex justify-between">
                                            <span>Пн–Пт:</span>
                                            <span className="font-medium">09:00–20:00</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span>Сб:</span>
                                            <span className="font-medium">10:00–19:00</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span>Вс:</span>
                                            <span className="font-medium">10:00–17:00</span>
                                        </p>
                                    </div>
                                </div>

                                <button className="">
                                    Обратная связь
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}