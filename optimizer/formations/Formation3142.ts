import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation3142 extends Formation {
    formationId: FormationId = "3142";

    /**
     *
     * @param players Order: LST, RST, LM, LCM, CDM, RCM, RM, LCB, CB, RCB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "LCM", "LM"],
            RST: ["RM", "RCM", "LST"],
            LM: ["LST", "LCM", "LCB"],
            LCM: ["LST", "CDM", "LM"],
            CDM: ["RCM", "RCB", "LCB", "LCM"],
            RCM: ["RST", "RM", "CDM"],
            RM: ["RCB", "RCM", "RST"],
            LCB: ["CDM", "CB", "GK", "LM"],
            CB: ["CDM", "RCB", "GK", "LCB"],
            RCB: ["RM", "GK", "CB", "CDM"],
            GK: ["CB", "RCB", "LCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation3142(players, useManager);
    }
}
