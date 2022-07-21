import { Tooltip } from "@chakra-ui/react";
import React from "react";

interface CustomTooltipProps {
    children: React.ReactNode;
    label?: string;
    hasArrow?: boolean;
    placement?: "top" | "bottom";
}

export default function CustomTooltip({
    hasArrow = true,
    label,
    children,
    placement
}: CustomTooltipProps) {
    return (
        <Tooltip
            hasArrow={hasArrow}
            label={label}
            aria-label={label}
            placement={placement}>
            {children}
        </Tooltip>
    );
}
