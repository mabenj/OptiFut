import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation3412 extends Formation {
    public readonly formationId = "3412";

    /**
     *
     * @param players Order: ST, ST, LM, CM, CAM, CM, RM, CB, CB, CB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "ST",
                "LM",
                "CM",
                "CAM",
                "CM",
                "RM",
                "CB",
                "CB",
                "CB",
                "GK"
            ]),
            useManager
        );
    }

    createFormation(players: PlayerEntity[], useManager: boolean) {
        return new Formation3412(players, useManager);
    }
}
