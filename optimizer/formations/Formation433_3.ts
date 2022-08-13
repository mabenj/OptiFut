import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation433_3 extends Formation {
    formationId: FormationId = "433_3";

    /**
     *
     * @param players Order: ST, LW, RW, LCDM, CM, RCDM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RW", "CM", "LW"],
            LW: ["ST", "LCDM"],
            RW: ["RCDM", "ST"],
            LCDM: ["LW", "CM", "LCB", "LB"],
            CM: ["ST", "RCDM", "LCDM"],
            RCDM: ["RB", "RCB", "CM", "RW"],
            LB: ["LCDM", "LCB"],
            LCB: ["RCB", "GK", "LB", "LCDM"],
            RCB: ["RCDM", "RB", "GK", "LCB"],
            RB: ["RCB", "RCDM"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation433_3(players, useManager);
    }
}
