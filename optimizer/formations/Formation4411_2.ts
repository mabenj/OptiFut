import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation4411_2 extends Formation {
    formationId: FormationId = "4411_2";

    /**
     *
     * @param players Order: ST, CAM, LM, LCM, RCM, RM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RM", "CAM", "LM"],
            CAM: ["ST", "RCM", "LCM"],
            LM: ["ST", "LCM", "LB"],
            LCM: ["CAM", "RCM", "LCB", "LM"],
            RCM: ["RM", "RCB", "LCM", "CAM"],
            RM: ["RB", "RCM", "ST"],
            LB: ["LM", "LCB"],
            LCB: ["LCM", "RCB", "GK", "LB"],
            RCB: ["RCM", "RB", "GK", "LCB"],
            RB: ["RM", "RCB"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation4411_2(players, useManager);
    }
}
