import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation433_4 extends Formation {
    public readonly formationId = "433_4";

    /**
     *
     * @param players Order: ST, LW, RW, CAM, CM, CM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "LW",
                "RW",
                "CAM",
                "CM",
                "CM",
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
        return new Formation433_4(players, useManager);
    }
}
