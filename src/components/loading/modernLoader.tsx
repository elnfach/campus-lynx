export const ModernLoader = () => {
    return (
        <div className="flex justify-center items-center space-x-2">
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                />
            ))}
        </div>
    );
};