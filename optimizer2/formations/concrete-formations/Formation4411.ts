import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation4411 extends Formation {
    public readonly formationId = "4411";

    /**
     *
     * @param players Order: ST, CF, LM, CM, CM, RM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "CF",
                "LM",
                "CM",
                "CM",
                "RM",
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
        return new Formation4411(players, useManager);
    }
}
