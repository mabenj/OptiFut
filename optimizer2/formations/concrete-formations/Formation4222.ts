import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation4222 extends Formation {
    public readonly formationId = "4222";

    /**
     *
     * @param players Order: ST, ST, CAM, CDM, CDM, CAM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "ST",
                "CAM",
                "CDM",
                "CDM",
                "CAM",
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
        return new Formation4222(players, useManager);
    }
}
