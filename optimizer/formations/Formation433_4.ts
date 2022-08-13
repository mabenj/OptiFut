import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation433_4 extends Formation {
    formationId: FormationId = "433_4";

    /**
     *
     * @param players Order: ST, LW, RW, CAM, LCM, RCM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RW", "CAM", "LW"],
            LW: ["ST", "LCM", "LB"],
            RW: ["RB", "RCM", "ST"],
            CAM: ["ST", "RCM", "LCM"],
            LCM: ["LW", "CAM", "LCB", "LB"],
            RCM: ["RB", "RCB", "CAM", "RW"],
            LB: ["LW", "LCM", "LCB"],
            LCB: ["RCB", "GK", "LB", "LCM"],
            RCB: ["RCM", "RB", "GK", "LCB"],
            RB: ["RCB", "RCM", "RW"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation433_4(players, useManager);
    }
}
