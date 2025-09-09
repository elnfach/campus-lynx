import { useState } from 'react';
import {useTheme} from "@/hooks/useTheme.ts";

type AccordionItem = {
    question: string;
    answer: string;
};

type AccordionProps = {
    items: AccordionItem[];
};

export const Accordion = ({ items }: AccordionProps) => {
    const {theme} = useTheme()
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const containerStyle = `
        w-full max-w-3xl mx-auto
    `

    const buttonStyle = `
        flex justify-between 
        items-center w-full 
        py-4 text-left 
        focus:outline-none transition-colors
        ${theme.colors.onSurface}
        ${theme.colors.onSurfaceHover}
        ${theme.typography.buttonSmall}
    `

    return (
        <div className={containerStyle}>
            {items.map((item, index) => (
                <div key={index} className="mb-4 border-b border-gray-200 last:border-b-0">
                    <button
                        className={buttonStyle}
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