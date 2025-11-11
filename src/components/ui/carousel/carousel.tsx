import React, {useEffect, useRef, useState} from "react";

interface CarouselProps<ItemType>
{
    items: ItemType[],
    Card: React.ComponentType<{item: ItemType}>
}

const Carousel = <ItemType,>(
    {
        items,
        Card,
    }: CarouselProps<ItemType>
) =>
{
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScrollPosition = () => {
        if (!scrollRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtStart = scrollLeft === 0;
        const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;

        setShowLeftArrow(!isAtStart);
        setShowRightArrow(!isAtEnd);
    };

    useEffect(() => {
        checkScrollPosition();
        window.addEventListener('resize', checkScrollPosition);
        return () => window.removeEventListener('resize', checkScrollPosition);
    }, []);

    const handleScroll = () => {
        checkScrollPosition();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        checkScrollPosition();
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current.offsetLeft || 0);
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });

            setTimeout(checkScrollPosition, 100);
        }
    };

    return(
        <>
            <div className="relative group">
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-university-secondary hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                )}

                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto scrollbar-hide space-x-6 py-4 px-2 cursor-grab active:cursor-grabbing"
                >
                    {items.map((item) => (
                        <Card
                            item={item}
                        />
                    ))}
                </div>

                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-university-secondary hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                )}
            </div>
            <div className="flex justify-center mt-6 space-x-2 md:hidden">
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 bg-university-primary text-white rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                )}
                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 bg-university-primary text-white rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                )}
            </div>
        </>
    )
}

export default Carousel;