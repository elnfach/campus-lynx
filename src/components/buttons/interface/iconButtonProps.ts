import type {BaseButtonProps} from "@/components/buttons/interface/baseButtonProps.ts";
import React from "react";

export interface IconButtonProps extends BaseButtonProps {
    icon: React.ReactNode;
    text?: never;
}