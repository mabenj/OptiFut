import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation442 extends Formation {
    public readonly formationId = "442";

    /**
     *
     * @param players Order: ST, ST, LM, CM, CM, RM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "ST",
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
        return new Formation442(players, useManager);
    }
}
