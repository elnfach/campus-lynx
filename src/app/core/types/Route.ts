import type {ComponentType, JSX, ReactNode} from "react";


export interface Route
{
    path: string;
    element: ComponentType;
    layout: ComponentType<{children: ReactNode}>;
}