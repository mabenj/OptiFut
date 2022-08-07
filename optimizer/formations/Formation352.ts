import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation352 extends Formation {
    formationId: FormationId = "352";

    /**
     *
     * @param players Order: LST, RST, LM, LCDM, CAM, RCDM, RM, LCB, CB, RCB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            LST: ["RST", "CAM", "LM"],
            RST: ["RM", "CAM", "LST"],
            LM: ["LST", "LCDM", "LCB"],
            LCDM: ["CAM", "RCDM", "CB", "LCB", "LM"],
            CAM: ["RST", "RCDM", "LCDM", "LST"],
            RCDM: ["RM", "RCB", "CB", "LCDM", "CAM"],
            RM: ["RCB", "RCDM", "RST"],
            LCB: ["LCDM", "CB", "GK", "LM"],
            CB: ["RCDM", "RCB", "GK", "LCB", "LCDM"],
            RCB: ["RM", "GK", "CB", "RCDM"],
            GK: ["CB", "RCB", "LCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation352(players, useManager);
    }
}
