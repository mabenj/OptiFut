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
    export function toString(position: PositionValue): string {
        return PositionValue[position];
    }

    export function fromString(position: string): PositionValue {
        return (PositionValue as any)[position];
    }
}
