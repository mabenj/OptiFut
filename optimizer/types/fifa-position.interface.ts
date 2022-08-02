import { FifaPositions } from "../constants/positions";
import { PositionValue } from "./position-value.enum";

export interface FifaPosition {
    positionValue: PositionValue;
    relatedPositions: PositionValue[];
    unrelatedPositions: PositionValue[];
}

export namespace FifaPosition {
    export function fromString(position: string): FifaPosition {
        return FifaPositions[position as keyof typeof FifaPositions];
    }
}
