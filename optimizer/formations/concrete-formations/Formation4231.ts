import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation4231 extends Formation {
    public readonly formationId = "4231";

    /**
     *
     * @param players Order: ST, CAM, CAM, CAM, CDM, CDM, LB, CB, CB, RB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "CAM",
                "CAM",
                "CAM",
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
        return new Formation4231(players, useManager);
    }
}
