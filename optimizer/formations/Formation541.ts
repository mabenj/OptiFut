import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation541 extends Formation {
    formationId: FormationId = "541";

    /**
     *
     * @param players Order: ST, LM, LCM, RCM, RM, LWB, LCB, CB, RCB, RWB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RM", "RCM", "LCM", "LM"],
            LM: ["ST", "LCM", "LWB"],
            LCM: ["ST", "RCM", "CB", "LWB", "LM"],
            RCM: ["RM", "RWB", "CB", "LCM", "ST"],
            RM: ["RWB", "RCM", "ST"],
            LWB: ["LM", "LCM", "LCB"],
            LCB: ["CB", "GK", "LWB"],
            CB: ["RCM", "RCB", "GK", "LCB", "LCM"],
            RCB: ["RWB", "GK", "CB"],
            RWB: ["RCB", "RCM", "RM"],
            GK: ["LCB", "CB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation541(players, useManager);
    }
}
