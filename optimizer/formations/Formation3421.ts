import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation3421 extends Formation {
    formationId: FormationId = "3421";

    /**
     *
     * @param players Order: LF, ST, RF, LM, LCM, RCM, RM, LCB, CB, RCB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LF: ["ST", "LCM", "LM"],
            ST: ["RF", "LF"],
            RF: ["RM", "RCM", "ST"],
            LM: ["LF", "LCM", "LCB"],
            LCM: ["RCM", "CB", "LM", "LF"],
            RCM: ["RF", "RM", "CB", "LCM"],
            RM: ["RCB", "RCM", "RF"],
            LCB: ["CB", "GK", "LM"],
            CB: ["RCB", "GK", "LCB", "LCM", "RCM"],
            RCB: ["RM", "GK", "CB"],
            GK: ["LCB", "CB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation3421(players, useManager);
    }
}
