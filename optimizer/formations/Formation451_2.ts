import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation451_2 extends Formation {
    formationId: FormationId = "451_2";

    /**
     *
     * @param players Order: ST, LM, LCM, CM, RCM, RM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RM", "CM", "LM"],
            LM: ["ST", "LCM", "LB"],
            LCM: ["CM", "LCB", "LB", "LM"],
            CM: ["ST", "RCM", "RCB", "LCB", "LCM"],
            RCM: ["RM", "RB", "RCB", "CM"],
            RM: ["RB", "RCM", "ST"],
            LB: ["LM", "LCM", "LCB"],
            LCB: ["LCM", "CM", "RCB", "GK", "LB"],
            RCB: ["RCM", "RB", "GK", "LCB", "CM"],
            RB: ["RM", "RCB", "RCM"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation451_2(players, useManager);
    }
}
