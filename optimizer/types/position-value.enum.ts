import { PositionNodeId } from "./position-node-id.type";

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

    export function fromNodeId(nodeId: PositionNodeId): PositionValue {
        switch (nodeId) {
            case "LST":
            case "ST":
            case "RST":
                return PositionValue.ST;
            case "CF":
                return PositionValue.CF;
            case "LF":
                return PositionValue.LF;
            case "RF":
                return PositionValue.RF;
            case "LW":
                return PositionValue.LW;
            case "RW":
                return PositionValue.RW;
            case "LCAM":
            case "CAM":
            case "RCAM":
                return PositionValue.CAM;
            case "LM":
                return PositionValue.LM;
            case "LCM":
            case "CM":
            case "RCM":
                return PositionValue.CM;
            case "RM":
                return PositionValue.RM;
            case "LCDM":
            case "CDM":
            case "RCDM":
                return PositionValue.CDM;
            case "LWB":
                return PositionValue.LWB;
            case "RWB":
                return PositionValue.RWB;
            case "LB":
                return PositionValue.LB;
            case "RB":
                return PositionValue.RB;
            case "LCB":
            case "CB":
            case "RCB":
                return PositionValue.CB;
            case "GK":
                return PositionValue.GK;
            default:
                throw new Error(
                    `Cannot resolve node '${nodeId}' to position value`
                );
        }
    }
}
