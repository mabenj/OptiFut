import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation4321 extends Formation {
    formationId: FormationId = "4321";

    /**
     *
     * @param players Order: ST, LF, RF, LCM, CM, RCM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        const nodes = PositionNode.createForFormation(players, {
            ST: ["RF", "LF"],
            LF: ["ST", "CM", "LCM"],
            RF: ["RCM", "CM", "ST"],
            LCM: ["LF", "CM", "LCB", "LB"],
            CM: ["RF", "RCM", "LCM", "LF"],
            RCM: ["RB", "RCB", "CM", "RF"],
            LB: ["LCM", "LCB"],
            LCB: ["RCB", "GK", "LB", "LCM"],
            RCB: ["RCM", "RB", "GK", "LCB"],
            RB: ["RCB", "RCM"],
            GK: ["LCB", "RCB"]
        });
        super(nodes, useManager);
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation4321(players, useManager);
    }
}
