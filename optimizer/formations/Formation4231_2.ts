import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation4231_2 extends Formation {
    formationId: FormationId = "4231_2";

    /**
     *
     * @param players Order: ST, LM, CAM, RM, LCDM, RCDM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RM", "CAM", "LM"],
            LM: ["ST", "CAM", "LCDM", "LB"],
            CAM: ["ST", "RM", "RCDM", "LCDM", "LM"],
            RM: ["RB", "RCDM", "CAM", "ST"],
            LCDM: ["CAM", "LCB", "LB", "LM"],
            RCDM: ["RM", "RB", "RCB", "CAM"],
            LB: ["LM", "LCDM", "LCB"],
            LCB: ["LCDM", "RCB", "GK", "LB"],
            RCB: ["RCDM", "RB", "GK", "LCB"],
            RB: ["RM", "RCB", "RCDM"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation4231_2(players, useManager);
    }
}
