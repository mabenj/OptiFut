import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation451 extends Formation {
    formationId: FormationId = "451";

    /**
     *
     * @param players Order: ST, LCAM, RCAM, LM, CM, RM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RCAM", "LCAM"],
            LCAM: ["ST", "RCAM", "CM", "LM"],
            RCAM: ["RM", "CM", "LCAM", "ST"],
            LM: ["LCAM", "LB"],
            CM: ["RCAM", "RCB", "LCB", "LCAM"],
            RM: ["RB", "RCAM"],
            LB: ["LM", "LCB"],
            LCB: ["CM", "RCB", "GK", "LB"],
            RCB: ["RB", "GK", "LCB", "CM"],
            RB: ["RM", "RCB"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation451(players, useManager);
    }
}
