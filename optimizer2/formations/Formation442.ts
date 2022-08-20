import { PlayerEntity } from "../PlayerEntity";
import { PositionNode } from "../PositionNode";
import { Formation } from "./Formation";

export class Formation442 extends Formation {
    readonly formationId = "442";

    /**
     *
     * @param players Order: LST, RST, LM, LCM, RCM, RM, LB, LCB, RCB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "LST",
                "RST",
                "LM",
                "LCM",
                "RCM",
                "RM",
                "LB",
                "LCB",
                "RCB",
                "RB",
                "GK"
            ]),
            useManager
        );
    }

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {
        return new Formation442(players, useManager);
    }
}
