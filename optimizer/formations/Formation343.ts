import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation343 extends Formation {
    formationId: FormationId = "343";

    /**
     *
     * @param players Order: LW, ST, RW, LM, LCM, RCM, RM, LCB, CB, RCB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LW: ["ST", "LM"],
            ST: ["RW", "RCM", "LCM", "LW"],
            RW: ["RM", "ST"],
            LM: ["LW", "LCM", "LCB"],
            LCM: ["ST", "RCM", "CB", "LM"],
            RCM: ["RM", "CB", "LCM", "ST"],
            RM: ["RCB", "RCM", "RW"],
            LCB: ["CB", "GK", "LM"],
            CB: ["RCM", "RCB", "GK", "LCB", "LCM"],
            RCB: ["RM", "GK", "CB"],
            GK: ["CB", "RCB", "LCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation343(players, useManager);
    }
}
