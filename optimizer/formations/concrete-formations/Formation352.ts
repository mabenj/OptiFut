import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation352 extends Formation {
    public readonly formationId = "352";

    /**
     *
     * @param players Order: ST, ST, LM, CDM, CAM, CDM, RM, CB, CB, CB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "ST",
                "LM",
                "CDM",
                "CAM",
                "CDM",
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
        return new Formation352(players, useManager);
    }
}
