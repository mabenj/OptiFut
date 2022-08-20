import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation41212_2 extends Formation {
    public readonly formationId = "41212_2";

    /**
     *
     * @param players Order: ST, ST, CM, CAM, CDM, CM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "ST",
                "CM",
                "CAM",
                "CDM",
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
        return new Formation41212_2(players, useManager);
    }
}
