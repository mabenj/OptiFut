import { PositionTag } from "./position-tag.type";

// Order important! It denotes the position modification distances
export enum PositionIdentifier {
    // ST -> CDM
    ST,
    CF,
    CAM,
    CM,
    CDM,
    // LF -> LM
    LF,
    LW,
    LM,
    // RF -> RM
    RF,
    RW,
    RM,
    // LWB -> LB
    LWB,
    LB,
    // RWB -> RB
    RWB,
    RB,
    // CB
    CB,
    // GK
    GK
}

export namespace PositionIdentifier {
    export function toTag(posId: PositionIdentifier): PositionTag {
        return PositionIdentifier[posId] as PositionTag;
    }

    export function toString(posId: PositionIdentifier): string {
        return PositionIdentifier[posId];
    }

    export function fromString(posId: string): PositionIdentifier {
        return (PositionIdentifier as any)[posId];
    }
}
