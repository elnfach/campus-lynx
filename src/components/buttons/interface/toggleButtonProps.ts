import type {ButtonProps} from "@/components/buttons/interface/buttonProps.ts";

export interface ToggleButtonProps extends ButtonProps {
    isActive: boolean;
}