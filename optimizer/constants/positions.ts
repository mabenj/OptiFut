import { PositionValue } from "../types/position-value.enum";
import { PositionInfo } from "../types/position-info.interface";

export const PositionInfos = {
    ST: {
        position: PositionValue.ST,
        relatedPositions: [PositionValue.LF, PositionValue.RF],
        unrelatedPositions: [PositionValue.CF]
    } as PositionInfo,
    LF: {
        position: PositionValue.LF,
        relatedPositions: [
            PositionValue.LM,
            PositionValue.CF,
            PositionValue.RF,
            PositionValue.ST
        ],
        unrelatedPositions: [PositionValue.LW]
    } as PositionInfo,
    RF: {
        position: PositionValue.RF,
        relatedPositions: [
            PositionValue.LM,
            PositionValue.CF,
            PositionValue.RF,
            PositionValue.ST
        ],
        unrelatedPositions: [PositionValue.LW]
    } as PositionInfo,
    CF: {
        position: PositionValue.CF,
        relatedPositions: [PositionValue.CAM, PositionValue.ST],
        unrelatedPositions: [PositionValue.LF, PositionValue.RF]
    } as PositionInfo,
    LW: {
        position: PositionValue.LW,
        relatedPositions: [PositionValue.LM, PositionValue.LF],
        unrelatedPositions: [PositionValue.LWB, PositionValue.RW]
    } as PositionInfo,
    RW: {
        position: PositionValue.RW,
        relatedPositions: [PositionValue.RM, PositionValue.RF],
        unrelatedPositions: [PositionValue.RWB, PositionValue.LW]
    } as PositionInfo,
    LM: {
        position: PositionValue.LM,
        relatedPositions: [PositionValue.LW],
        unrelatedPositions: [
            PositionValue.LB,
            PositionValue.LWB,
            PositionValue.CM,
            PositionValue.RM,
            PositionValue.LF
        ]
    } as PositionInfo,
    RM: {
        position: PositionValue.RM,
        relatedPositions: [PositionValue.RW],
        unrelatedPositions: [
            PositionValue.RB,
            PositionValue.RWB,
            PositionValue.CM,
            PositionValue.LM,
            PositionValue.RF
        ]
    } as PositionInfo,
    CAM: {
        position: PositionValue.CAM,
        relatedPositions: [PositionValue.CM, PositionValue.CF],
        unrelatedPositions: [PositionValue.CDM]
    } as PositionInfo,
    CM: {
        position: PositionValue.CM,
        relatedPositions: [PositionValue.CDM, PositionValue.CAM],
        unrelatedPositions: [PositionValue.RM, PositionValue.LM]
    } as PositionInfo,
    CDM: {
        position: PositionValue.CDM,
        relatedPositions: [PositionValue.CM],
        unrelatedPositions: [PositionValue.CB, PositionValue.CAM]
    } as PositionInfo,
    LWB: {
        position: PositionValue.LWB,
        relatedPositions: [PositionValue.LB],
        unrelatedPositions: [
            PositionValue.RWB,
            PositionValue.LM,
            PositionValue.LW
        ]
    } as PositionInfo,
    RWB: {
        position: PositionValue.RWB,
        relatedPositions: [PositionValue.RB],
        unrelatedPositions: [
            PositionValue.LWB,
            PositionValue.RM,
            PositionValue.RW
        ]
    } as PositionInfo,
    LB: {
        position: PositionValue.LB,
        relatedPositions: [PositionValue.LWB],
        unrelatedPositions: [
            PositionValue.RB,
            PositionValue.CB,
            PositionValue.LM,
            PositionValue.LW
        ]
    } as PositionInfo,
    RB: {
        position: PositionValue.RB,
        relatedPositions: [PositionValue.RWB],
        unrelatedPositions: [
            PositionValue.LB,
            PositionValue.CB,
            PositionValue.RM,
            PositionValue.RW
        ]
    } as PositionInfo,
    CB: {
        position: PositionValue.CB,
        relatedPositions: [],
        unrelatedPositions: [
            PositionValue.RB,
            PositionValue.LB,
            PositionValue.CDM
        ]
    } as PositionInfo,
    GK: {
        position: PositionValue.GK,
        relatedPositions: [],
        unrelatedPositions: []
    }
};

export const PositionModifierGroups = {
    StrikersMidfielders: [
        PositionValue.ST,
        PositionValue.CF,
        PositionValue.CAM,
        PositionValue.CM,
        PositionValue.CDM
    ],
    LeftFielders: [PositionValue.LF, PositionValue.LW, PositionValue.LM],
    RightFielders: [PositionValue.RF, PositionValue.RW, PositionValue.RM],
    LeftBacks: [PositionValue.LWB, PositionValue.LB],
    RightBacks: [PositionValue.RWB, PositionValue.RB],
    CenterBacks: [PositionValue.CB],
    Goalkeepers: [PositionValue.GK]
};
