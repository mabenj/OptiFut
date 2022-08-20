import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation4312 extends Formation {
    public readonly formationId = "4312";

    /**
     *
     * @param players Order: ST, ST, CM, CAM, CM, CM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "ST",
                "CM",
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
        return new Formation4312(players, useManager);
    }
}
