import { PlayerEntity } from "../../PlayerEntity";
import { PositionNode } from "../../PositionNode";
import { Formation } from "../Formation";

export class Formation3142 extends Formation {
    public readonly formationId = "3142";

    /**
     *
     * @param players Order: ST, ST, LM, CM, CDM, CM, RM, CB, CB, CB, GK
     */
    constructor(players: PlayerEntity[], useManager: boolean) {
        super(
            PositionNode.createForFormation(players, [
                "ST",
                "ST",
                "LM",
                "CM",
                "CDM",
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
        return new Formation3142(players, useManager);
    }
}
