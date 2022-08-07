import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation4141 extends Formation {
    formationId: FormationId = "4141";

    /**
     *
     * @param players Order: ST, LM, LCM, CDM, RCM, RM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RM", "RCM", "LCM", "LM"],
            LM: ["ST", "LCM", "LB"],
            LCM: ["ST", "RCM", "CDM", "LCB", "LM"],
            CDM: ["RCM", "RCB", "LCB", "LCM"],
            RCM: ["RM", "RCB", "CDM", "LCM", "ST"],
            RM: ["RB", "RCM", "ST"],
            LB: ["LM", "LCB"],
            LCB: ["LCM", "CDM", "RCB", "GK", "LB"],
            RCB: ["RCM", "RB", "GK", "LCB", "CDM"],
            RB: ["RM", "RCB"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation4141(players, useManager);
    }
}
