import { useState } from 'react';

type AccordionItem = {
    question: string;
    answer: string;
};

type AccordionProps = {
    items: AccordionItem[];
};

export const Accordion = ({ items }: AccordionProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {items.map((item, index) => (
                <div key={index} className="mb-4 border-b border-gray-200 last:border-b-0">
                    <button
                        className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-900 hover:text-blue-600 focus:outline-none transition-colors"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={activeIndex === index}
                        aria-controls={`accordion-content-${index}`}
                    >
                        <span className="text-lg">{item.question}</span>
                        <span className="ml-4 transform transition-transform duration-200">
              {activeIndex === index ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
              ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
              )}
            </span>
                    </button>
                    <div
                        id={`accordion-content-${index}`}
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="pb-6 text-gray-600">{item.answer}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};