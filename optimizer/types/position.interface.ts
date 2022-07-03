import { PositionIdentifier } from "./position-identifier.enum";

export interface Position {
    naturalPosition: PositionIdentifier;
    unrelatedPositions: PositionIdentifier[];
    relatedPositions: PositionIdentifier[];
}
