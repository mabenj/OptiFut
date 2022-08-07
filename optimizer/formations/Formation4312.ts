import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation4312 extends Formation {
    formationId: FormationId = "4312";

    /**
     *
     * @param players Order: LST, RST, LCM, CAM, CM, RCM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "CAM", "LCM"],
            RST: ["RCM", "CAM", "LST"],
            LCM: ["LST", "CM", "LCB", "LB"],
            CAM: ["RST", "CM", "LST"],
            CM: ["CAM", "RCM", "RCB", "LCB", "LCM"],
            RCM: ["RB", "RCB", "CM", "RST"],
            LB: ["LCM", "LCB"],
            LCB: ["CM", "RCB", "GK", "LB", "LCM"],
            RCB: ["RCM", "RB", "GK", "LCB", "CM"],
            RB: ["RCM", "RCB"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation4312(players, useManager);
    }
}
