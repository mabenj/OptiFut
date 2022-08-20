import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation451_2 extends Formation {
    public readonly formationId = "451_2";

    /**
     *
     * @param players Order: ST, LM, CM, CM, CM, RM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "LM",
                "CM",
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
        return new Formation451_2(players, useManager);
    }
}
