
import { useTheme } from "@/hooks/useTheme.ts";
import type EducationalFormItem from "@/components/cards/educationalForm/educationalFormItem.ts";

interface EducationalFormCardProps {
    item: EducationalFormItem;
}

const EducationalFormCard = ({ item }: EducationalFormCardProps) => {
    const { theme } = useTheme();

    const containerStyle = `
        flex-shrink-0 w-80 h-90
        
        ${theme.colors.surfaceContainer}
        
        rounded-xl shadow-lg
        
        overflow-hidden hover:shadow-xl transition-all
        
        duration-300 hover:-translate-y-1
    `;

    const titleStyle = `
        text-3xl font-bold
        ${theme.colors.onSurface}
    `;

    const descriptionStyle = `
        mt-auto leading-relaxed 
        ${theme.colors.onSecondaryContainer}
    `;

    const iconStyle = `
    h-8 w-8 ml-3
    ${theme.colors.onPrimaryContainer}
  `;

    return (
        <div className={containerStyle}>
            <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between">
                    <h3 className={titleStyle}>{item.title}</h3>
                    <div className={iconStyle}>{item.icon}</div>
                </div>

                <div className={descriptionStyle}>
                    {item.description}
                </div>
            </div>
        </div>
    );
};

export default EducationalFormCard;