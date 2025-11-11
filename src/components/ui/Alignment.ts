import type {AlignmentConfig} from "@/components/ui/AlignmentConfig.ts";
import type {HorizontalAlignment} from "@/components/ui/HorizontalAlignment.ts";
import type {VerticalAlignment} from "@/components/ui/VerticalAlignment.ts";

export class Alignment {
    // Horizontal alignments
    static readonly Start: AlignmentConfig = { horizontal: 'start' };
    static readonly CenterHorizontally: AlignmentConfig = { horizontal: 'center' };
    static readonly End: AlignmentConfig = { horizontal: 'end' };

    // Vertical alignments
    static readonly Top: AlignmentConfig = { vertical: 'top' };
    static readonly CenterVertically: AlignmentConfig = { vertical: 'center' };
    static readonly Bottom: AlignmentConfig = { vertical: 'bottom' };

    // Combined alignments
    static readonly Center: AlignmentConfig = {
        horizontal: 'center',
        vertical: 'center'
    };

    // Factory methods
    static horizontal(alignment: HorizontalAlignment): AlignmentConfig {
        return { horizontal: alignment };
    }

    static vertical(alignment: VerticalAlignment): AlignmentConfig {
        return { vertical: alignment };
    }

    static applyToElement(
        config: AlignmentConfig,
        isVertical: boolean = false
    ): string {
        const classes: string[] = []
        classes.push('flex');

        if (isVertical) {
            classes.push('flex-col');
        }

        if (config.horizontal) {
            if (isVertical) {
                switch (config.horizontal) {
                    case 'start':
                        classes.push('items-start');
                        break;
                    case 'center':
                        classes.push('items-center');
                        break;
                    case 'end':
                        classes.push('items-end');
                        break;
                }
            }
        }

        if (config.vertical) {
            if (!isVertical) {
                switch (config.vertical) {
                    case 'top':
                        classes.push('items-start');
                        break;
                    case 'center':
                        classes.push('items-center');
                        break;
                    case 'bottom':
                        classes.push('items-end');
                        break;
                }
            }
        }
        return classes.join(' ')
    }
}