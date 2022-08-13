import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation4411 extends Formation {
    formationId: FormationId = "4411";

    /**
     *
     * @param players Order: ST, CF, LM, LCM, RCM, RM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RM", "CF", "LM"],
            CF: ["ST", "RCM", "LCM"],
            LM: ["ST", "LCM", "LB"],
            LCM: ["CF", "RCM", "LCB", "LM"],
            RCM: ["RM", "RCB", "LCM", "CF"],
            RM: ["RB", "RCM", "ST"],
            LB: ["LM", "LCB"],
            LCB: ["LCM", "RCB", "GK", "LB"],
            RCB: ["RCM", "RB", "GK", "LCB"],
            RB: ["RM", "RCB"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation4411(players, useManager);
    }
}
