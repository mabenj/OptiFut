import { PositionValue } from "./position-value.enum";

export interface PositionInfo {
    position: PositionValue;
    relatedPositions: PositionValue[];
    unrelatedPositions: PositionValue[];
}
