import { useState } from "react";
import { PlayerPositions } from "../../data/constants";
import { PlayerPosition } from "../../types/player-position.type";

export function usePrefPosition(initialValue?: PlayerPosition) {
    const [prefPosition, setPrefPosition] = useState<PlayerPosition>(
        initialValue || PlayerPositions[0]
    );
    return [prefPosition, setPrefPosition] as const;
}
