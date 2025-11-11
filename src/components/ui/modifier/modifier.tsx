export type PaddingValues = number |
    [number, number] |
    [number, number, number, number]

export type MarginValues = number |
    [number, number] |
    [number, number, number, number]

type InnerPadding = number | PaddingValues
type InnerMargin = number | MarginValues

export default class Modifier {
    private classes: string[] = [];

    padding(value: PaddingValues): Modifier;
    padding(value: number): Modifier;
    padding(vertical: number, horizontal: number): Modifier;
    padding(start: number, top: number, end: number, bottom: number): Modifier;
    padding(...args: InnerPadding[]): Modifier {
        if (args.length === 1 && Array.isArray(args[0])) {
            const paddingArray = args[0] as number[];
            return this.handleSpacing(paddingArray, 'p');
        }
        const numbers = args as number[];
        return this.handleSpacing(numbers, 'p');
    }

    margin(value: InnerMargin): Modifier;
    margin(value: number): Modifier;
    margin(vertical: number, horizontal: number): Modifier;
    margin(start: number, top: number, end: number, bottom: number): Modifier;
    margin(...args: number[]): Modifier {
        if (args.length === 1 && Array.isArray(args[0])) {
            const paddingArray = args[0] as number[];
            return this.handleSpacing(paddingArray, 'm');
        }
        const numbers = args as number[];
        return this.handleSpacing(numbers, 'm');
    }

    private handleSpacing(array: number[], type: string, unit: string = 'px'): Modifier {
        switch (array.length) {
            case 1:
                this.classes.push(`${type}-[${array[0]}${unit}]`);
                break;
            case 2:
                this.classes.push(`${type}x-[${array[0]}${unit}]`, `${type}y-[${array[1]}${unit}]`);
                break;
            case 4:
                this.classes.push(
                    `${type}r-[${array[1]}${unit}]`,
                    `${type}t-[${array[0]}px]`,
                    `${type}l-[${array[3]}px]`,
                    `${type}b-[${array[2]}px]`,
                );
                break;
        }
        return this;
    }


    border(width: number = 1, color: string = 'gray-500', style: string = 'solid'): Modifier {
        this.classes.push(`border-${width}`);

        if (color) {
            this.classes.push(`border-${color}`);
        }

        if (style === 'dashed') {
            this.classes.push('border-dashed');
        } else if (style === 'dotted') {
            this.classes.push('border-dotted');
        } else if (style === 'double') {
            this.classes.push('border-double');
        } else {
            this.classes.push('border-solid');
        }

        return this;
    }

    borderRadius(value: number): Modifier {
        this.classes.push(`rounded-${value}`);
        return this;
    }

    size(value: number): Modifier {
        this.classes.push(`w-[${value}px]`, `h-[${value}px]`);
        return this;
    }

    fillMaxSize(fraction: number = 1) : Modifier {
        if(fraction == 1) {
            this.classes.push(`size-full`)
        } else this.size(fraction)
        return this;
    }

    height(value: number): Modifier {
        this.classes.push(`h-[${value}px]`);
        return this;
    }

    fillMaxHeight(fraction: number = 1) : Modifier {
        if(fraction == 1) {
            this.classes.push(`h-full`)
        } else this.height(fraction)
        return this;
    }

    width(value: number): Modifier {
        this.classes.push(`w-[${value}px]`);
        return this;
    }

    fillMaxWidth(fraction: number = 1) : Modifier {
        if(fraction == 1) {
            this.classes.push(`w-full`)
        } else this.width(fraction)
        return this;
    }

    backgroundColor(color: string): Modifier {
        this.classes.push(`bg-${color}`);
        return this;
    }

    textColor(color: string): Modifier {
        this.classes.push(`text-${color}`);
        return this;
    }

    build(): string {
        return this.classes.join(' ');
    }

    clear(): Modifier {
        this.classes = [];
        return this;
    }

    static new(): Modifier {
        return new Modifier();
    }
}