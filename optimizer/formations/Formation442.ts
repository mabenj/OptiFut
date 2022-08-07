import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation442 extends Formation {
    formationId: FormationId = "442";

    /**
     *
     * @param players Order: LST, RST, LM, LCM, RCM, RM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "LCM", "LM"],
            RST: ["LST", "RM", "RCM"],
            LM: ["LST", "LCM", "LB"],
            LCM: ["LST", "RCM", "LCB", "LM"],
            RCM: ["RST", "RM", "RCB", "LCM"],
            RM: ["RST", "RB", "RCM"],
            LB: ["LM", "LCB"],
            LCB: ["LCM", "RCB", "GK", "LB"],
            RCB: ["RCM", "RB", "GK", "LCB"],
            RB: ["RM", "RCB"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation442(players, useManager);
    }
}
