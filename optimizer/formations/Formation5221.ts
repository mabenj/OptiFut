import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation5221 extends Formation {
    formationId: FormationId = "5221";

    /**
     *
     * @param players Order: ST, LW, RW, LCM, RCM, LWB, LCB, CB, RCB, RWB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RW", "RCM", "LCM", "LW"],
            LW: ["ST", "LCM", "LWB"],
            RW: ["RWB", "RCM", "ST"],
            LCM: ["ST", "RCM", "CB", "LWB", "LW"],
            RCM: ["RW", "RWB", "CB", "LCM", "ST"],
            LWB: ["LW", "LCM", "LCB"],
            LCB: ["CB", "GK", "LWB"],
            CB: ["RCM", "RCB", "GK", "LCB", "LCM"],
            RCB: ["RWB", "GK", "CB"],
            RWB: ["RCB", "RCM", "RW"],
            GK: ["LCB", "CB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation5221(players, useManager);
    }
}
