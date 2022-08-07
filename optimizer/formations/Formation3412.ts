import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation3412 extends Formation {
    formationId: FormationId = "3412";

    /**
     *
     * @param players Order: LST, RST, LM, LCM, CAM, RCM, RM, LCB, CB, RCB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "CAM", "LM"],
            RST: ["RM", "CAM", "LST"],
            LM: ["LST", "LCM", "LCB"],
            LCM: ["CAM", "RCM", "CB", "LM"],
            CAM: ["RST", "RCM", "LCM", "LST"],
            RCM: ["RM", "CB", "LCM", "CAM"],
            RM: ["RCB", "RCM", "RST"],
            LCB: ["CB", "GK", "LM"],
            CB: ["RCB", "GK", "LCB", "LCM", "RCM"],
            RCB: ["RM", "GK", "CB"],
            GK: ["LCB", "CB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation3412(players, useManager);
    }
}
