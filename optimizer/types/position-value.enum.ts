import { PositionId } from "./position-id.type";

export enum PositionValue {
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

export namespace PositionValue {
    export function toPositionId(posId: PositionValue): PositionId {
        return PositionValue[posId] as PositionId;
    }

    export function toString(posId: PositionValue): string {
        return PositionValue[posId];
    }

    export function fromString(posId: string): PositionValue {
        return (PositionValue as any)[posId];
    }
}
