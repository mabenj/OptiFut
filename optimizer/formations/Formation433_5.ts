import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation433_5 extends Formation {
    formationId: FormationId = "433_5";

    /**
     *
     * @param players Order: LW, RW, CF, LCM, RCM, CDM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LW: ["CF", "LCM", "LB"],
            RW: ["RB", "RCM", "CF"],
            CF: ["RW", "RCM", "LCM", "LW"],
            LCM: ["CF", "CDM", "LB", "LW"],
            RCM: ["RW", "RB", "CDM", "CF"],
            CDM: ["RCM", "RCB", "LCB", "LCM"],
            LB: ["LW", "LCM", "LCB"],
            LCB: ["CDM", "RCB", "GK", "LB"],
            RCB: ["RB", "GK", "LCB", "CDM"],
            RB: ["RCB", "RCM", "RW"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation433_5(players, useManager);
    }
}
