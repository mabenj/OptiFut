import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation433_2 extends Formation {
    formationId: FormationId = "433_2";

    /**
     *
     * @param players Order: ST, LW, RW, LCM, CDM, RCM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RW", "RCM", "LCM", "LW"],
            LW: ["ST", "LCM"],
            RW: ["RCM", "ST"],
            LCM: ["LW", "ST", "RCM", "CDM", "LB"],
            CDM: ["RCM", "RCB", "LCB", "LCM"],
            RCM: ["RB", "CDM", "LCM", "ST", "RW"],
            LB: ["LCM", "LCB"],
            LCB: ["CDM", "RCB", "GK", "LB"],
            RCB: ["RB", "GK", "LCB", "CDM"],
            RB: ["RCB", "RCM"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation433_2(players, useManager);
    }
}
