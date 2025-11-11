import type {JSX} from "react";

export default interface NaItem {
    id: number;
    name: string;
    icon: JSX.Element;
    ref: string;
}