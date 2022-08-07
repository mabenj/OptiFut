import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation424 extends Formation {
    formationId: FormationId = "424";

    /**
     *
     * @param players Order: LST, RST, LW, RW, LCM, RCM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "LCM", "LW"],
            RST: ["RW", "RCM", "LST"],
            LW: ["LST", "LCM", "LB"],
            RW: ["RB", "RCM", "RST"],
            LCM: ["LST", "RCM", "LCB", "LB", "LW"],
            RCM: ["RST", "RW", "RB", "RCB", "LCM"],
            LB: ["LW", "LCM", "LCB"],
            LCB: ["LCM", "RCB", "GK", "LB"],
            RCB: ["RCM", "RB", "GK", "LCB"],
            RB: ["RW", "RCB", "RCM"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation424(players, useManager);
    }
}
