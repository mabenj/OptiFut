import { FifaPosition } from "../types/fifa-position.interface";
import { PositionValue } from "../types/position-value.enum";

interface FifaPositions {
    ST: FifaPosition;
    LF: FifaPosition;
    RF: FifaPosition;
    CF: FifaPosition;
    LW: FifaPosition;
    RW: FifaPosition;
    LM: FifaPosition;
    RM: FifaPosition;
    CAM: FifaPosition;
    CM: FifaPosition;
    CDM: FifaPosition;
    LWB: FifaPosition;
    RWB: FifaPosition;
    LB: FifaPosition;
    RB: FifaPosition;
    CB: FifaPosition;
    GK: FifaPosition;
}

export const FifaPositions: FifaPositions = {
    ST: {
        positionValue: PositionValue.ST,
        relatedPositions: [PositionValue.LF, PositionValue.RF],
        unrelatedPositions: [PositionValue.CF]
    },
    LF: {
        positionValue: PositionValue.LF,
        relatedPositions: [
            PositionValue.LM,
            PositionValue.CF,
            PositionValue.RF,
            PositionValue.ST
        ],
        unrelatedPositions: [PositionValue.LW]
    },
    RF: {
        positionValue: PositionValue.RF,
        relatedPositions: [
            PositionValue.LM,
            PositionValue.CF,
            PositionValue.RF,
            PositionValue.ST
        ],
        unrelatedPositions: [PositionValue.LW]
    },
    CF: {
        positionValue: PositionValue.CF,
        relatedPositions: [PositionValue.CAM, PositionValue.ST],
        unrelatedPositions: [PositionValue.LF, PositionValue.RF]
    },
    LW: {
        positionValue: PositionValue.LW,
        relatedPositions: [PositionValue.LM, PositionValue.LF],
        unrelatedPositions: [PositionValue.LWB, PositionValue.RW]
    },
    RW: {
        positionValue: PositionValue.RW,
        relatedPositions: [PositionValue.RM, PositionValue.RF],
        unrelatedPositions: [PositionValue.RWB, PositionValue.LW]
    },
    LM: {
        positionValue: PositionValue.LM,
        relatedPositions: [PositionValue.LW],
        unrelatedPositions: [
            PositionValue.LB,
            PositionValue.LWB,
            PositionValue.CM,
            PositionValue.RM,
            PositionValue.LF
        ]
    },
    RM: {
        positionValue: PositionValue.RM,
        relatedPositions: [PositionValue.RW],
        unrelatedPositions: [
            PositionValue.RB,
            PositionValue.RWB,
            PositionValue.CM,
            PositionValue.LM,
            PositionValue.RF
        ]
    },
    CAM: {
        positionValue: PositionValue.CAM,
        relatedPositions: [PositionValue.CM, PositionValue.CF],
        unrelatedPositions: [PositionValue.CDM]
    },
    CM: {
        positionValue: PositionValue.CM,
        relatedPositions: [PositionValue.CDM, PositionValue.CAM],
        unrelatedPositions: [PositionValue.RM, PositionValue.LM]
    },
    CDM: {
        positionValue: PositionValue.CDM,
        relatedPositions: [PositionValue.CM],
        unrelatedPositions: [PositionValue.CB, PositionValue.CAM]
    },
    LWB: {
        positionValue: PositionValue.LWB,
        relatedPositions: [PositionValue.LB],
        unrelatedPositions: [
            PositionValue.RWB,
            PositionValue.LM,
            PositionValue.LW
        ]
    },
    RWB: {
        positionValue: PositionValue.RWB,
        relatedPositions: [PositionValue.RB],
        unrelatedPositions: [
            PositionValue.LWB,
            PositionValue.RM,
            PositionValue.RW
        ]
    },
    LB: {
        positionValue: PositionValue.LB,
        relatedPositions: [PositionValue.LWB],
        unrelatedPositions: [
            PositionValue.RB,
            PositionValue.CB,
            PositionValue.LM,
            PositionValue.LW
        ]
    },
    RB: {
        positionValue: PositionValue.RB,
        relatedPositions: [PositionValue.RWB],
        unrelatedPositions: [
            PositionValue.LB,
            PositionValue.CB,
            PositionValue.RM,
            PositionValue.RW
        ]
    },
    CB: {
        positionValue: PositionValue.CB,
        relatedPositions: [],
        unrelatedPositions: [
            PositionValue.RB,
            PositionValue.LB,
            PositionValue.CDM
        ]
    },
    GK: {
        positionValue: PositionValue.GK,
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
