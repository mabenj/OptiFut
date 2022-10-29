import { PlayerPosition } from "./player-position.type";

export type PositionNodeId =
    | "LST"
    | "ST"
    | "RST"
    | "CF"
    | "LW"
    | "RW"
    | "LCAM"
    | "CAM"
    | "RCAM"
    | "LM"
    | "LCM"
    | "CM"
    | "RCM"
    | "RM"
    | "LCDM"
    | "CDM"
    | "RCDM"
    | "LWB"
    | "RWB"
    | "LB"
    | "RB"
    | "LCB"
    | "CB"
    | "RCB"
    | "GK";

export namespace PositionNodeId {
    export function toPlayerPosition(nodeId: PositionNodeId): PlayerPosition {
        switch (nodeId) {
            case "LST":
            case "ST":
            case "RST":
                return "ST";
            case "CF":
                return "CF";
            case "LW":
                return "LW";
            case "RW":
                return "RW";
            case "LCAM":
            case "CAM":
            case "RCAM":
                return "CAM";
            case "LM":
                return "LM";
            case "LCM":
            case "CM":
            case "RCM":
                return "CM";
            case "RM":
                return "RM";
            case "LCDM":
            case "CDM":
            case "RCDM":
                return "CDM";
            case "LWB":
                return "LWB";
            case "RWB":
                return "RWB";
            case "LB":
                return "LB";
            case "RB":
                return "RB";
            case "LCB":
            case "CB":
            case "RCB":
                return "CB";
            case "GK":
                return "GK";
            default:
                throw new Error(
                    `Cannot resolve node '${nodeId}' to player position`
                );
        }
    }
}
