import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation41212_2 extends Formation {
    formationId: FormationId = "41212_2";

    /**
     *
     * @param players Order: LST, RST, LCM, CAM, CDM, RCM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "CAM", "LCM"],
            RST: ["RCM", "CAM", "LST"],
            LCM: ["LST", "CAM", "CDM", "LB"],
            CAM: ["RST", "RCM", "CDM", "LCM", "LST"],
            CDM: ["CAM", "RCM", "RCB", "LCB", "LCM"],
            RCM: ["RB", "CDM", "CAM", "RST"],
            LB: ["LCM", "LCB"],
            LCB: ["CDM", "RCB", "GK", "LB"],
            RCB: ["RB", "GK", "LCB", "CDM"],
            RB: ["RCB", "RCM"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation41212_2(players, useManager);
    }
}
