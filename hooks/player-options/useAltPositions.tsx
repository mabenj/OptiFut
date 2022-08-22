import { useState } from "react";
import { PlayerPositions } from "../../data/constants";
import { PlayerPosition } from "../../types/player-position.type";

export function useAltPositions(initialValue?: PlayerPosition[]) {
    const [altPositions, setAltPositions] = useState<PlayerPosition[]>(
        initialValue ||[PlayerPositions[0], PlayerPositions[1]]
    );
    return [altPositions, setAltPositions] as const;
}
