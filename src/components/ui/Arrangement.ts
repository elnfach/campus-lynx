import type {ArrangementConfig} from "@/components/ui/ArrangementConfig.ts";

export class Arrangement {
    // Horizontal arrangements
    static readonly Start: ArrangementConfig = { type: 'start' };
    static readonly Center: ArrangementConfig = { type: 'center' };
    static readonly End: ArrangementConfig = { type: 'end' };

    // Space distributions
    static readonly SpaceBetween: ArrangementConfig = {
        type: 'distributed',
        distribution: 'between'
    };

    static readonly SpaceAround: ArrangementConfig = {
        type: 'distributed',
        distribution: 'around'
    };

    static readonly SpaceEvenly: ArrangementConfig = {
        type: 'distributed',
        distribution: 'evenly'
    };

    // Factory method for spacedBy
    static spacedBy(space: number): ArrangementConfig {
        return { type: 'spaced', spacing: space };
    }

    // Vertical specific arrangements
    static readonly Top: ArrangementConfig = { type: 'start' };
    static readonly Bottom: ArrangementConfig = { type: 'end' };

    static applyToElement(
        config: ArrangementConfig,
        isVertical: boolean = false
    ): string {
        const classes: string[] = []
        classes.push('flex');

        if (isVertical) {
            classes.push('flex-col');
        }

        switch (config.type) {
            case 'start':
                classes.push(isVertical ? 'justify-start' : 'justify-start');
                break;
            case 'center':
                classes.push('justify-center');
                break;
            case 'end':
                classes.push(isVertical ? 'justify-end' : 'justify-end');
                break;
            case 'spaced':
                if (config.spacing) {
                    classes.push(`gap-${config.spacing}`);
                }
                break;
            case 'distributed':
                switch (config.distribution) {
                    case 'between':
                        classes.push('justify-between');
                        break;
                    case 'around':
                        classes.push('justify-around');
                        break;
                    case 'evenly':
                        classes.push('justify-evenly');
                        break;
                }
                break;
        }
        return classes.join(' ')
    }
}
