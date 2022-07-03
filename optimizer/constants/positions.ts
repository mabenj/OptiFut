import { AllPositions } from "../types/all-positions.interface";
import { PositionIdentifier as PosId } from "../types/position-identifier.enum";

export const POSITIONS: AllPositions = {
    ST: {
        naturalPosition: PosId.ST,
        relatedPositions: [PosId.LF, PosId.RF],
        unrelatedPositions: [PosId.CF]
    },
    LF: {
        naturalPosition: PosId.LF,
        relatedPositions: [PosId.LM, PosId.CF, PosId.RF, PosId.ST],
        unrelatedPositions: [PosId.LW]
    },
    RF: {
        naturalPosition: PosId.RF,
        relatedPositions: [PosId.LM, PosId.CF, PosId.RF, PosId.ST],
        unrelatedPositions: [PosId.LW]
    },
    CF: {
        naturalPosition: PosId.CF,
        relatedPositions: [PosId.CAM, PosId.ST],
        unrelatedPositions: [PosId.LF, PosId.RF]
    },
    LW: {
        naturalPosition: PosId.LW,
        relatedPositions: [PosId.LM, PosId.LF],
        unrelatedPositions: [PosId.LWB, PosId.RW]
    },
    RW: {
        naturalPosition: PosId.RW,
        relatedPositions: [PosId.RM, PosId.RF],
        unrelatedPositions: [PosId.RWB, PosId.LW]
    },
    LM: {
        naturalPosition: PosId.LM,
        relatedPositions: [PosId.LW],
        unrelatedPositions: [PosId.LB, PosId.LWB, PosId.CM, PosId.RM, PosId.LF]
    },
    RM: {
        naturalPosition: PosId.RM,
        relatedPositions: [PosId.RW],
        unrelatedPositions: [PosId.RB, PosId.RWB, PosId.CM, PosId.LM, PosId.RF]
    },
    CAM: {
        naturalPosition: PosId.CAM,
        relatedPositions: [PosId.CM, PosId.CF],
        unrelatedPositions: [PosId.CDM]
    },
    CM: {
        naturalPosition: PosId.CM,
        relatedPositions: [PosId.CDM, PosId.CAM],
        unrelatedPositions: [PosId.RM, PosId.LM]
    },
    CDM: {
        naturalPosition: PosId.CDM,
        relatedPositions: [PosId.CM],
        unrelatedPositions: [PosId.CB, PosId.CAM]
    },
    LWB: {
        naturalPosition: PosId.LWB,
        relatedPositions: [PosId.LB],
        unrelatedPositions: [PosId.RWB, PosId.LM, PosId.LW]
    },
    RWB: {
        naturalPosition: PosId.RWB,
        relatedPositions: [PosId.RB],
        unrelatedPositions: [PosId.LWB, PosId.RM, PosId.RW]
    },
    LB: {
        naturalPosition: PosId.LB,
        relatedPositions: [PosId.LWB],
        unrelatedPositions: [PosId.RB, PosId.CB, PosId.LM, PosId.LW]
    },
    RB: {
        naturalPosition: PosId.RB,
        relatedPositions: [PosId.RWB],
        unrelatedPositions: [PosId.LB, PosId.CB, PosId.RM, PosId.RW]
    },
    CB: {
        naturalPosition: PosId.CB,
        relatedPositions: [],
        unrelatedPositions: [PosId.RB, PosId.LB, PosId.CDM]
    },
    GK: {
        naturalPosition: PosId.GK,
        relatedPositions: [],
        unrelatedPositions: []
    }
};

export const POSITION_MODIFIER_GROUPS = {
    StrikersMidfielders: [PosId.ST, PosId.CF, PosId.CAM, PosId.CM, PosId.CDM],
    LeftFielders: [PosId.LF, PosId.LW, PosId.LM],
    RightFielders: [PosId.RF, PosId.RW, PosId.RM],
    LeftBacks: [PosId.LWB, PosId.LB],
    RightBacks: [PosId.RWB, PosId.RB],
    CenterBacks: [PosId.CB],
    Goalkeepers: [PosId.GK]
};
