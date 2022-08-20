import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation4411_2 extends Formation {
    public readonly formationId = "4411_2";

    /**
     *
     * @param players Order: ST, CAM, LM, CM, CM, RM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "CAM",
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
        return new Formation4411_2(players, useManager);
    }
}
