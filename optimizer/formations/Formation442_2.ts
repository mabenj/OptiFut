import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation442_2 extends Formation {
    formationId: FormationId = "442_2";

    /**
     *
     * @param players Order: LST, RST, LM, LCDM, RCDM, RM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "LCDM", "LM"],
            RST: ["RM", "RCDM", "LST"],
            LM: ["ST", "LCDM", "LB"],
            LCDM: ["RCDM", "LCB", "LM", "LST"],
            RCDM: ["RST", "RM", "RCB", "LCDM"],
            RM: ["RB", "RCDM", "RST"],
            LB: ["LM", "LCB"],
            LCB: ["LCDM", "RCB", "GK", "LB"],
            RCB: ["RB", "GK", "LCB", "RCDM"],
            RB: ["RCB", "RM"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation442_2(players, useManager);
    }
}
