import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation433 extends Formation {
    formationId: FormationId = "433";

    /**
     *
     * @param players Order: LW, ST, RW, LCM, CM, RCM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LW: ["ST", "LCM"],
            ST: ["LW", "RW", "CM"],
            RW: ["ST", "RCM"],
            LCM: ["LW", "CM", "LB"],
            CM: ["LCM", "ST", "RCM", "LCB", "RCB"],
            RCM: ["CM", "RW", "RB"],
            LB: ["LCM", "LCB"],
            LCB: ["LB", "CM", "RCB", "GK"],
            RCB: ["LCB", "CM", "RB", "GK"],
            RB: ["RCB", "RCM"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation433(players, useManager);
    }
}
