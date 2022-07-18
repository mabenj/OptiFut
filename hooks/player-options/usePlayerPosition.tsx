import { useState } from "react";
import { PlayerPosition } from "../../types/player-position.type";

export function usePlayerPosition(initialValue?: PlayerPosition) {
    const [selectedPosition, setSelectedPosition] = useState<PlayerPosition>(
        initialValue || POSITION_OPTIONS[0]
    );
    return [selectedPosition, setSelectedPosition, POSITION_OPTIONS] as const;
}

const POSITION_OPTIONS: PlayerPosition[] = [
    "ST",
    "CF",
    "CAM",
    "CM",
    "CDM",
    "LF",
    "LW",
    "LM",
    "RF",
    "RW",
    "RM",
    "LWB",
    "LB",
    "RWB",
    "RB",
    "CB",
    "GK"
];
