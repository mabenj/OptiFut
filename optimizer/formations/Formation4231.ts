import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation4231 extends Formation {
    formationId: FormationId = "4231";

    /**
     *
     * @param players Order: ST, LCAM, RCAM, CAM, LCDM, RCDM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RCAM", "CAM", "LCAM"],
            LCAM: ["ST", "CAM", "LCDM"],
            RCAM: ["RCDM", "CAM", "ST"],
            CAM: ["ST", "RCAM", "RCDM", "LCDM", "LCAM"],
            LCDM: ["LCAM", "CAM", "LCB", "LB"],
            RCDM: ["RB", "RCB", "CAM", "RCAM"],
            LB: ["LCDM", "LCB"],
            LCB: ["RCB", "GK", "LB", "LCDM"],
            RCB: ["RCDM", "RB", "GK", "LCB"],
            RB: ["RCB", "RCDM"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation4231(players, useManager);
    }
}
