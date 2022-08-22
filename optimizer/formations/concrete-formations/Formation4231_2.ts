import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation4231_2 extends Formation {
    public readonly formationId = "4231_2";

    /**
     *
     * @param players Order: ST, LM, CAM, RM, CDM, CDM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "LM",
                "CAM",
                "RM",
                "CDM",
                "CDM",
                "LB",
                "CB",
                "CB",
                "RB",
                "GK"
            ]),
            useManager
        );
    }

    createFormation(players: PlayerEntity[], useManager: boolean) {
        return new Formation4231_2(players, useManager);
    }
}
