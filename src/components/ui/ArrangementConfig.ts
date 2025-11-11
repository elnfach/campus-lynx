import type {SpaceDistribution} from "@/components/ui/SpaceDistribution.ts";

export interface ArrangementConfig {
    type: 'start' | 'center' | 'end' | 'spaced' | 'distributed';
    spacing?: number;
    distribution?: SpaceDistribution;
}