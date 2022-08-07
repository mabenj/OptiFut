import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation4222 extends Formation {
    formationId: FormationId = "4222";

    /**
     *
     * @param players Order: LST, RST, LCAM, LCDM, RCDM, RCAM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "LCDM", "LCAM"],
            RST: ["RCAM", "RCDM", "LST"],
            LCAM: ["LST", "LCDM", "LB"],
            LCDM: ["LST", "RCDM", "LCB", "LCAM"],
            RCDM: ["RST", "RCAM", "RCB", "LCDM"],
            RCAM: ["RB", "RCDM", "RST"],
            LB: ["LCAM", "LCB"],
            LCB: ["LCDM", "RCB", "GK", "LB"],
            RCB: ["RCDM", "RB", "GK", "LCB"],
            RB: ["RCAM", "RCB"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation4222(players, useManager);
    }
}
