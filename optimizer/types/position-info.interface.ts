import { PositionInfos } from "../constants/positions";
import { PositionValue } from "./position-value.enum";

export interface PositionInfo {
    position: PositionValue;
    relatedPositions: PositionValue[];
    unrelatedPositions: PositionValue[];
}

export namespace PositionInfo {
    export function fromString(position: string): PositionInfo {
        return PositionInfos[position as keyof typeof PositionInfos];
    }
}
