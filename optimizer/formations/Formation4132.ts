import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation4132 extends Formation {
    formationId: FormationId = "4132";

    /**
     *
     * @param players Order: LST, RST, LM, CM, CDM, RM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "CM", "LM"],
            RST: ["RM", "CM", "LST"],
            LM: ["LST", "CM", "CDM", "LB"],
            CM: ["RST", "RM", "CDM", "LM", "LST"],
            CDM: ["CM", "RM", "RCB", "LCB", "LM"],
            RM: ["RB", "CDM", "CM", "RST"],
            LB: ["LM", "LCB"],
            LCB: ["CDM", "RCB", "GK", "LB"],
            RCB: ["RB", "GK", "LCB", "CDM"],
            RB: ["RCB", "RM"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation4132(players, useManager);
    }
}
