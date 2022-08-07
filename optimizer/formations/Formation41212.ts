import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation41212 extends Formation {
    formationId: FormationId = "41212";

    /**
     *
     * @param players Order: LST, RST, LM, CAM, CDM, RM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "CAM", "LM"],
            RST: ["RM", "CAM", "LST"],
            LM: ["LST", "CAM", "CDM", "LB"],
            CAM: ["RST", "RM", "CDM", "LM"],
            CDM: ["CAM", "RM", "RCB", "LCB", "LM"],
            RM: ["RB", "CDM", "CAM", "RST"],
            LB: ["LM", "LCB"],
            LCB: ["CDM", "RCB", "GK", "LB"],
            RCB: ["RB", "GK", "LCB", "CDM"],
            RB: ["RCB", "RM"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation41212(players, useManager);
    }
}
