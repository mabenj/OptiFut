import { PositionInfo } from "../types/position-info.interface";
import { PositionValue } from "../types/position-value.enum";

export const PositionInfos: PositionInfo[] = [
    {
        position: PositionValue.ST,
        relatedPositions: [PositionValue.CF],
        unrelatedPositions: [PositionValue.LF, PositionValue.RF]
    },
    {
        position: PositionValue.LF,
        relatedPositions: [PositionValue.LW],
        unrelatedPositions: [
            PositionValue.LM,
            PositionValue.CF,
            PositionValue.RF,
            PositionValue.ST
        ]
    },
    {
        position: PositionValue.RF,
        relatedPositions: [PositionValue.RW],
        unrelatedPositions: [
            PositionValue.RM,
            PositionValue.CF,
            PositionValue.LF,
            PositionValue.ST
        ]
    },
    {
        position: PositionValue.CF,
        relatedPositions: [PositionValue.CAM, PositionValue.ST],
        unrelatedPositions: [PositionValue.LF, PositionValue.RF]
    },
    {
        position: PositionValue.LW,
        relatedPositions: [PositionValue.LM, PositionValue.LF],
        unrelatedPositions: [PositionValue.LWB, PositionValue.RW]
    },
    {
        position: PositionValue.RW,
        relatedPositions: [PositionValue.RM, PositionValue.RF],
        unrelatedPositions: [PositionValue.RWB, PositionValue.LW]
    },
    {
        position: PositionValue.LM,
        relatedPositions: [PositionValue.LW],
        unrelatedPositions: [
            PositionValue.LB,
            PositionValue.LWB,
            PositionValue.CM,
            PositionValue.RM,
            PositionValue.LF
        ]
    },
    {
        position: PositionValue.RM,
        relatedPositions: [PositionValue.RW],
        unrelatedPositions: [
            PositionValue.RB,
            PositionValue.RWB,
            PositionValue.CM,
            PositionValue.LM,
            PositionValue.RF
        ]
    },
    {
        position: PositionValue.CAM,
        relatedPositions: [PositionValue.CM, PositionValue.CF],
        unrelatedPositions: [PositionValue.CDM]
    },
    {
        position: PositionValue.CM,
        relatedPositions: [PositionValue.CDM, PositionValue.CAM],
        unrelatedPositions: [PositionValue.RM, PositionValue.LM]
    },
    {
        position: PositionValue.CDM,
        relatedPositions: [PositionValue.CM],
        unrelatedPositions: [PositionValue.CB, PositionValue.CAM]
    },
    {
        position: PositionValue.LWB,
        relatedPositions: [PositionValue.LB],
        unrelatedPositions: [
            PositionValue.RWB,
            PositionValue.LM,
            PositionValue.LW
        ]
    },
    {
        position: PositionValue.RWB,
        relatedPositions: [PositionValue.RB],
        unrelatedPositions: [
            PositionValue.LWB,
            PositionValue.RM,
            PositionValue.RW
        ]
    },
    {
        position: PositionValue.LB,
        relatedPositions: [PositionValue.LWB],
        unrelatedPositions: [
            PositionValue.RB,
            PositionValue.CB,
            PositionValue.LM,
            PositionValue.LW
        ]
    },
    {
        position: PositionValue.RB,
        relatedPositions: [PositionValue.RWB],
        unrelatedPositions: [
            PositionValue.LB,
            PositionValue.CB,
            PositionValue.RM,
            PositionValue.RW
        ]
    },
    {
        position: PositionValue.CB,
        relatedPositions: [],
        unrelatedPositions: [
            PositionValue.RB,
            PositionValue.LB,
            PositionValue.CDM
        ]
    },
    {
        position: PositionValue.GK,
        relatedPositions: [],
        unrelatedPositions: []
    }
];

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
